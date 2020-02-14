import { documentReady, render, createCell } from 'web-cell';

import { DetectPage } from './page';

documentReady.then(() => render(<DetectPage />));
