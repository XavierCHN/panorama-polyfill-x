import { format } from './format';

declare global {
  interface ErrorConstructor {
    // this is v8 only
    captureStackTrace(thisArg: any, func: any): void
  }
}
  
function write(text: string) {
  for (const line of text.split('\n')) {
    if (line.length > 2047) {
      const postfix = '... (line have been trimmed because of a length limit)';
      $.Warning(`${line.slice(0, 2047 - postfix.length)}${postfix}`);
    } else {
      $.Msg(line);
    }
  }
}

function assert(value: any, message = 'console.assert', ...args: any[]) {
  if (!value) {
    error(new Error(`Assertion failed: ${message}`), ...args);
  }
}

function error(...args: any[]) {
  $.Warning(format(...args));
}

const warn = error;

function log(...args: any[]) {
  write(format(...args));
}

const debug = log;
const info = log;

const times = new Map<string, number>();
function time(label = 'default') {
  label = `${label}`;

  if (times.has(label)) {
    warn(`Timer '${label}' already exists`);
    return;
  }

  times.set(label, Date.now());
}

function timeEnd(label = 'default') {
  label = `${label}`;

  const startTime = times.get(label);
  if (startTime == null) {
    warn(`Timer '${label} does not exist'`);
    return;
  }

  times.delete(label);
  write(`${label}: ${Date.now() - startTime}ms`);
}

function trace(message: any = '', ...args: any[]) {
  const errorObject: Error = {
    message: format(message, ...args),
    name: 'Trace',
    stack: '',
  };

  Error.captureStackTrace(errorObject, trace);
  write(format(errorObject.stack));
}

function clear() {}

function dir() {
  throw new Error('console.dir is not implemented');
}

function dirxml() {
  throw new Error('console.dirxml is not implemented');
}

function table() {
  throw new Error('console.table is not implemented');
}

function count() {
  throw new Error('console.count is not implemented');
}

function countReset() {
  throw new Error('console.countReset is not implemented');
}

function group() {
  throw new Error('console.group is not implemented');
}

function groupCollapsed() {
  throw new Error('console.groupCollapsed is not implemented');
}

function groupEnd() {
  throw new Error('console.groupEnd is not implemented');
}

function profile() {
  throw new Error('console.profile is not implemented');
}

function profileEnd() {
  throw new Error('console.profileEnd is not implemented');
}

function timeStamp() {
  throw new Error('console.timeStamp is not implemented');
}

export const console = {
  assert,
  warn,
  error,
  log,
  debug,
  info,
  time,
  timeEnd,
  trace,
  clear,
  dir,
  dirxml,
  table,
  count,
  countReset,
  group,
  groupCollapsed,
  groupEnd,
  profile,
  profileEnd,
  timeStamp,
};
