import util from 'util';

export default function consoleLog(data: object) {
  console.log(
    util.inspect(data, { showHidden: false, depth: null, colors: true }),
  );
}
