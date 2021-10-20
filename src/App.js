import React from 'react';
import { Button, Link } from 'carbon-components-react';
import IbmCloud24 from '@carbon/icons-react/lib/ibm-cloud/24';
import Launch16 from '@carbon/icons-react/lib/launch/16';
import Header from './components/Header';
import ServiceContainer from './components/ServiceContainer';
import useScript from './hooks/useScript';

const HEADER_TITLE = 'STT App for CheckRide !!!!!';
const HEADER_DESCRIPTION = '';
const HEADER_LINKS = [
  <Link
    className='link getting-started'
    key='ibm-cloud-link'
    target='_blank'
    rel='noopener noreferrer'
    href='https://console-openshift-console.ibmcloud-roks-zmiopc20-6ccd7f378ae819553d37d5f2ee142bd6-0000.jp-tok.containers.appdomain.cloud/dashboards'
  >
    <Button className='link-button' kind='tertiary' renderIcon={Launch16}>
      Go to OpenShift
    </Button>
    <IbmCloud24 className='link-icon' />
  </Link>,
];

export const App = () => {
  useScript(
    'https://cdn.jsdelivr.net/gh/watson-developer-cloud/watson-developer-cloud.github.io@master/analytics.js',
  );

  return (
    <div className='app-container'>
      <Header
        description={HEADER_DESCRIPTION}
        links={HEADER_LINKS}
        title={HEADER_TITLE}
      />
      <ServiceContainer />
    </div>
  );
};

export default App;