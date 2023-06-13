import 'styled-components';

import ligth from './ligth';

declare module 'styled-components' {
  type ThemeType = typeof ligth;

  export interface DefaultTheme extends ThemeType {}
}