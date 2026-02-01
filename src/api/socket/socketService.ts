import { secureStorage } from '@/storage/storage';
import { io, Socket } from 'socket.io-client';

// TODO  listener cleanup
class SocketService {
  private socket: Socket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;

  async connect() {
    if (this.socket?.connected) {
      console.log('⚠️ Socket already connected');
      return;
    }

    const token = await secureStorage.getAccessToken();

    if (!token) {
      throw new Error('No auth token found');
    }

    const wsUrl = process.env.EXPO_PUBLIC_WS_URL;

    console.log('🔌 Connecting to:', wsUrl);

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
      this.reconnectAttempts = 0;
    });

    this.socket.on('disconnect', (reason) => {
      console.log('Socket disconnected:', reason);

      if (reason === 'io server disconnect') {
        console.log('Reconnecting...');
        this.socket?.connect();
      }
    });

    this.socket.on('error', (error) => {
      console.error('Socket error:', error);
    });

    this.socket.on('connect_error', (error) => {
      console.error('Connection error:', error.message);
      this.reconnectAttempts++;

      if (this.reconnectAttempts >= this.maxReconnectAttempts) {
        console.error('Max reconnection attempts reached');
        this.disconnect();
      }
    });

    this.socket.on('reconnect_attempt', (attemptNumber) => {
      console.log(
        `🔄 Reconnection attempt ${attemptNumber}/${this.maxReconnectAttempts}`
      );
    });

    this.socket.on('reconnect', (attemptNumber) => {
      console.log(` Reconnected after ${attemptNumber} attempts`);
      this.reconnectAttempts = 0;
    });

    this.socket.on('reconnect_failed', () => {
      console.error('Reconnection failed');
    });
  }

  disconnect() {
    if (this.socket) {
      console.log('Disconnecting socket...', this.socket.id);
      this.socket.removeAllListeners();
      this.socket.disconnect();
      this.socket = null;
      this.reconnectAttempts = 0;
    }
  }

  sendMessage(
    recipientId: string,
    messageContent: string,
    contextType?: string
  ) {
    if (!this.socket?.connected) {
      throw new Error('Socket not connected');
    }

    this.socket.emit('message', {
      recipientId,
      messageContent,
    });
  }

  onMessage<T = unknown>(callback: (data: T) => void | Promise<void>) {
    console.log('get message');

    if (!this.socket) {
      console.warn('⚠️ Cannot add message listener: socket not initialized');
      return;
    }
    this.socket.on('message', callback);
  }

  offMessage<T = unknown>(callback: (data: T) => void | Promise<void>) {
    if (!this.socket) return;
    this.socket.off('message', callback);
  }

  onMessageSent<T = unknown>(callback: (data: T) => void | Promise<void>) {
    if (!this.socket) {
      console.warn(
        '⚠️ Cannot add message_sent listener: socket not initialized'
      );
      return;
    }
    this.socket.on('message_sent', callback);
  }

  offMessageSent<T = unknown>(callback: (data: T) => void | Promise<void>) {
    if (!this.socket) return;
    this.socket.off('message_sent', callback);
  }

  onPendingMessages<T = unknown>(callback: (data: T) => void | Promise<void>) {
    if (!this.socket) {
      console.warn(
        '⚠️ Cannot add pending messages listener: socket not initialized'
      );
      return;
    }
    this.socket.on('pending_messages', callback);
  }
  offPendingMessages<T = unknown>(callback: (data: T) => void | Promise<void>) {
    if (!this.socket) return;
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
      this.socket.disconnect();
      this.socket.connect();
    }
  }

  cleanup() {
    console.log('socker cleanup');
    this.disconnect();
  }
}

export default new SocketService();
