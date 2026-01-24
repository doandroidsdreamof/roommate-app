import ScreenLayout from '../screenLayout/ScreenLayout';

const ScreenWithLayout = ({
  component: Component,
  scrollable,
}: {
  component: React.ComponentType;
  scrollable: boolean;
}) => (
  <ScreenLayout scrollable={scrollable}>
    <Component />
  </ScreenLayout>
);
export default ScreenWithLayout;
