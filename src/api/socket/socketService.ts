import { secureStorage } from '@/storage/storage';
import { io, Socket } from 'socket.io-client';
import Reactotron from 'reactotron-react-native';

// TODO  listener cleanup
class SocketService {
  private socket: Socket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;

  async connect() {
    if (this.socket?.connected) {
      console.log('⚠️ Socket already connected');
      this.log('warning', 'Socket already connected');
      return;
    }

    const token = await secureStorage.getAccessToken();

    if (!token) {
      this.log('error', 'No auth token found');
      throw new Error('No auth token found');
    }

    const wsUrl = process.env.EXPO_PUBLIC_WS_URL;

    console.log('🔌 Connecting to:', wsUrl);
    this.log('info', 'Connecting to socket', { url: wsUrl });

    this.socket = io(wsUrl, {
      auth: { token },
      transports: ['websocket'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: this.maxReconnectAttempts,
      timeout: 10000,
    });

    this.setupListeners();
  }

  private setupListeners() {
    if (!this.socket) return;

    this.socket.on('connect', () => {
      console.log('Socket connected:', this.socket?.id);
      this.log('connect', 'Socket connected', {
        id: this.socket?.id,
        transport: this.socket?.io?.engine?.transport?.name,
      });
      this.reconnectAttempts = 0;
    });

    this.socket.on('disconnect', (reason) => {
      console.log('Socket disconnected:', reason);
      this.log('disconnect', 'Socket disconnected', { reason });

      if (reason === 'io server disconnect') {
        console.log('Reconnecting...');
        this.log('info', 'Auto-reconnecting');
        this.socket?.connect();
      }
    });

    this.socket.on('error', (error) => {
      console.error('Socket error:', error);
      this.log('error', 'Socket error', {
        message: error.message,
        stack: error.stack,
      });
    });

    this.socket.on('connect_error', (error) => {
      console.error('Connection error:', error.message);
      this.reconnectAttempts++;
      this.log('error', 'Connection error', {
        message: error.message,
        attempts: this.reconnectAttempts,
        maxAttempts: this.maxReconnectAttempts,
      });

      if (this.reconnectAttempts >= this.maxReconnectAttempts) {
        console.error('Max reconnection attempts reached');
        this.log('error', 'Max reconnection attempts reached');
        this.disconnect();
      }
      if (this.socket) {
        this.socket.io.opts.reconnection = false;
      }
    });

    this.socket.on('reconnect_attempt', (attemptNumber) => {
      console.log(
        `🔄 Reconnection attempt ${attemptNumber}/${this.maxReconnectAttempts}`
      );
      this.log('info', 'Reconnection attempt', {
        attempt: attemptNumber,
        max: this.maxReconnectAttempts,
      });
    });

    this.socket.on('reconnect', (attemptNumber) => {
      console.log(` Reconnected after ${attemptNumber} attempts`);
      this.log('connect', 'Reconnected', { attempts: attemptNumber });
      this.reconnectAttempts = 0;
    });

    this.socket.on('reconnect_failed', () => {
      console.error('Reconnection failed');
      this.log('error', 'Reconnection failed');
    });

    // Log all socket events in DEV
    if (__DEV__) {
      this.socket.onAny((event, ...args) => {
        this.log('receive', `Received: ${event}`, args);
      });

      this.socket.onAnyOutgoing((event, ...args) => {
        this.log('send', `Sent: ${event}`, args);
      });
    }
  }

  disconnect() {
    if (this.socket) {
      console.log('Disconnecting socket...', this.socket.id);
      this.log('info', 'Disconnecting socket', { id: this.socket.id });
      this.socket.removeAllListeners();
      this.socket.disconnect();
      this.socket = null;
      this.reconnectAttempts = 0;
    }
  }

  sendMessage(
    recipientId: string,
    messageContent: string
    // contextType?: string
  ) {
    if (!this.socket?.connected) {
      this.log('error', 'Cannot send message: socket not connected');
      throw new Error('Socket not connected');
    }

    this.log('send', 'Sending message', { recipientId, messageContent });
    this.socket.emit('message', {
      recipientId,
      messageContent,
    });
  }

  onMessage<T = unknown>(callback: (data: T) => void | Promise<void>) {
    console.log('get message');

    if (!this.socket) {
      console.warn('⚠️ Cannot add message listener: socket not initialized');
      this.log(
        'warning',
        'Cannot add message listener: socket not initialized'
      );
      return;
    }
    this.log('info', 'Listener added: message');
    this.socket.on('message', callback);
  }

  offMessage<T = unknown>(callback: (data: T) => void | Promise<void>) {
    if (!this.socket) return;
    this.log('info', 'Listener removed: message');
    this.socket.off('message', callback);
  }

  onMessageSent<T = unknown>(callback: (data: T) => void | Promise<void>) {
    if (!this.socket) {
      console.warn(
        '⚠️ Cannot add message_sent listener: socket not initialized'
      );
      this.log(
        'warning',
        'Cannot add message_sent listener: socket not initialized'
      );
      return;
    }
    this.log('info', 'Listener added: message_sent');
    this.socket.on('message_sent', callback);
  }

  offMessageSent<T = unknown>(callback: (data: T) => void | Promise<void>) {
    if (!this.socket) return;
    this.log('info', 'Listener removed: message_sent');
    this.socket.off('message_sent', callback);
  }

  onPendingMessages<T = unknown>(callback: (data: T) => void | Promise<void>) {
    if (!this.socket) {
      console.warn(
        '⚠️ Cannot add pending messages listener: socket not initialized'
      );
      this.log(
        'warning',
        'Cannot add pending_messages listener: socket not initialized'
      );
      return;
    }
    this.log('info', 'Listener added: pending_messages');
    this.socket.on('pending_messages', callback);
  }

  offPendingMessages<T = unknown>(callback: (data: T) => void | Promise<void>) {
    if (!this.socket) return;
    this.log('info', 'Listener removed: pending_messages');
    this.socket.off('pending_messages', callback);
  }

  isConnected(): boolean {
    return this.socket?.connected ?? false;
  }

  getSocket(): Socket | null {
    return this.socket;
  }

  reconnect() {
    if (this.socket) {
      console.log('🔄 Force reconnecting...');
      this.log('info', 'Force reconnecting');
      this.socket.disconnect();
      this.socket.connect();
    }
  }

  cleanup() {
    console.log('socket cleanup');
    this.log('info', 'Socket cleanup');
    this.disconnect();
  }

  private log(
    type:
      | 'info'
      | 'warning'
      | 'error'
      | 'connect'
      | 'disconnect'
      | 'send'
      | 'receive',
    message: string,
    data?: unknown
  ) {
    if (!__DEV__) return;

    Reactotron.display({
      name: `${type} Socket: ${message}`,
      preview: message,
      value: data
        ? { timestamp: new Date().toISOString(), ...data }
        : { timestamp: new Date().toISOString() },
      important: type === 'error',
    });
  }
}

export default new SocketService();
