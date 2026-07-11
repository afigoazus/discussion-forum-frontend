import { LoadingBar } from '@dimasmds/react-redux-loading-bar';

export default function Loading() {
  return (
    <div className="sticky top-0 z-50">
      <LoadingBar style={{ height: '3px' }} />
    </div>
  );
}
