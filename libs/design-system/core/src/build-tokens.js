import StyleDictionary from 'style-dictionary';
import {
  logBrokenReferenceLevels,
  logVerbosityLevels,
  logWarningLevels,
  transformGroups,
  propertyFormatNames,
} from 'style-dictionary/enums';
import { formattedVariables, fileHeader } from 'style-dictionary/utils';

const { css } = propertyFormatNames;

// INFO: 기존의 변환 규칙을 수정하여 'colors-' 대신 'color'로 변경
StyleDictionary.registerTransform({
  name: 'name/cti/kebab',
  type: 'name',
  filter: (token) => {
    return token.name.startsWith('colors-');
  },
  transform: function (prop) {
    return prop.path.join('-').replace(/^colors-/, 'color-');
  },
});

StyleDictionary.registerFormat({
  name: 'format/tailwind-css',
  format: async function ({ dictionary, options = {}, file }) {
    const { usesDtcg } = options;

    // INFO: 파일 헤더
    const header = await fileHeader({
      file,
      options,
    });

    // INFO: :root 출력
    const rootOutput = formattedVariables({
      format: css,
      dictionary,
      usesDtcg,
    });

    // INFO: dictionary의 value를 css var로 wrapping
    const varWrappedDictionary = JSON.parse(JSON.stringify(dictionary));
    console.log(varWrappedDictionary);
    varWrappedDictionary.allTokens.forEach((prop) => {
      prop['$value'] = `var(--${prop.name})`;
    });
    // INFO: 변수 래핑된 dictionary를 사용하여 inline 출력
    const inlineOutput = formattedVariables({
      format: css,
      dictionary: varWrappedDictionary,
      usesDtcg,
    });

    return (
      header +
      // `:root {\n${rootOutput}\n}\n` +
      `\n@theme {\n${rootOutput}\n}\n`
      // `\n@theme inline {\n${inlineOutput}\n}\n`
    );
  },
});

const sd = new StyleDictionary({
  source: ['tokens/*.json'],
  preprocessors: ['tokens-studio'],
  platforms: {
    css: {
      transformGroup: transformGroups.css,
      transforms: ['name/cti/kebab'],
      buildPath: 'styles/',
      files: [
        {
          destination: '_variables.css',
          format: 'format/tailwind-css',
        },
      ],
    },
  },
  log: {
    warnings: logWarningLevels.warn, // 'warn' | 'error' | 'disabled'
    verbosity: logVerbosityLevels.default, // 'default' | 'silent' | 'verbose'
    errors: {
      brokenReferences: logBrokenReferenceLevels.throw, // 'throw' | 'console'
    },
  },
});
await sd.hasInitialized;

await sd.cleanAllPlatforms();
await sd.buildAllPlatforms();
