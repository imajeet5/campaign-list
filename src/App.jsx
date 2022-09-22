import './App.css';
import CampaignList from './components/CampaignList';
import { Provider } from 'react-redux';
import { campaigns } from './data/campaigns';
import store from './state/store';
import { AddCampaigns } from './state/campaignSlice';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from './shared/ErrorPage';

window.campaigns = campaigns;
window.AddCampaigns = (campaings) => store.dispatch(AddCampaigns(campaings));

store.dispatch(AddCampaigns(campaigns));

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Provider store={store}>
        <CampaignList />
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
