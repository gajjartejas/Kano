import numerals from './numerals.json';
const fs = require('fs');
const { XMLParser, XMLBuilder } = require('fast-xml-parser');
const path = require('path');

describe('Numerals unit tests', () => {
  it('should return 101 as numerals length', () => {
    expect(numerals.length).toBe(101);
  });

  it('test svg files', () => {
    const options = {
      ignoreAttributes: false,
    };
    for (let j1 = 0; j1 < numerals.length; j1++) {
      const element = numerals[j1];
      const filePath = 'assets/' + element.svg;
      try {
        const xmlDataStr = fs.readFileSync(path.resolve(path.join(__dirname, '../../../../'), filePath));
        const parser = new XMLParser(options);
        let jsonObj = parser.parse(xmlDataStr);

        let groups = jsonObj.svg.g;
        if (!Array.isArray(jsonObj.svg.g)) {
          groups = [groups];
        }
        let mappedGroups = groups.map((g: any, k: number) => {
          const gid = 'g' + k;
          return {
            ...g,
            '@_id': gid,
            '@_inkscape:label': gid,
            path: g.path.map((p: any, l: number) => {
              const pid = l === 0 ? 'p0' : `s${l - 1}`;
              const upid = gid + pid;
              return {
                ...p,
                '@_id': upid,
                '@_inkscape:label': upid,
              };
            }),
          };
        });

        jsonObj.svg.g = mappedGroups;
        const builder = new XMLBuilder(options);
        let xmlDataStr1 = builder.build(jsonObj);
        expect(xmlDataStr1).toMatch(xmlDataStr.toString());
      } catch (err) {
        expect(err).toMatch('error');
      }
    }
  });
});
