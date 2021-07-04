import { useState, useEffect } from 'react';

const cachedScripts: string[] = [];
interface IScriptResult {
  loaded: boolean;
  error: boolean;
}

export default function useKlashaScript(isTestMode = false): boolean[] {
  let src = '';
  if (isTestMode) {
    src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js';
  } else {
    src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js';
  }


  let src1 = '';
  if (isTestMode) {
    src1 = 'https://klastatic.fra1.digitaloceanspaces.com/test/js/klasha-integration.js';
  } else {
    src1 = 'https://klastatic.fra1.digitaloceanspaces.com/prod/js/klasha-integration.js';
  }

  const [state, setState] = useState<IScriptResult>({
    loaded: false,
    error: false,
  });

  useEffect((): any => {
    if (cachedScripts.includes(src) || cachedScripts.includes(src1)) {
      setState({
        loaded: true,
        error: false,
      });
    } else {

      const divScript = window.document.createElement('div');
      divScript.id = 'ktest';
      window.document.body.appendChild(divScript);


      cachedScripts.push(src);

      const script = document.createElement('script');
      script.src = src;
      script.async = true;

      const script1 = document.createElement('script');
      script1.src = src1;
      script1.async = true;

      const onScriptLoad = (): void => {
        setState({
          loaded: true,
          error: false,
        });
      };

      const onScriptError = (): void => {
        const index = cachedScripts.indexOf(src);
        if (index >= 0) cachedScripts.splice(index, 1);
        script.remove();


        const index1 = cachedScripts.indexOf(src1);
        if (index1 >= 0) cachedScripts.splice(index1, 1);
        script1.remove();

        setState({
          loaded: true,
          error: true,
        });
      };

      script.addEventListener('load', onScriptLoad);
      script.addEventListener('complete', onScriptLoad);
      script.addEventListener('error', onScriptError);

      script1.addEventListener('load', onScriptLoad);
      script1.addEventListener('complete', onScriptLoad);
      script1.addEventListener('error', onScriptError);

      document.body.appendChild(script);
      document.body.appendChild(script1);


      console.log(document, window,divScript, script, script1);


      return (): void => {
        script.removeEventListener('load', onScriptLoad);
        script.removeEventListener('error', onScriptError);

        script1.removeEventListener('load', onScriptLoad);
        script1.removeEventListener('error', onScriptError);
      };
    }
  }, [src]);

  return [state.loaded, state.error];
}
