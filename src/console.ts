import { console } from './utils/console';

type ConsoleType = typeof console;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Console extends ConsoleType {}

  // eslint-disable-next-line vars-on-top, no-var
  var console: Console;
}

// eslint-disable-next-line no-new-func
const global: typeof globalThis = (() => this)();
global.console = console;
