import { Plugin } from '@nuxt/types/app';
import { configure, extend } from 'vee-validate';
import { required } from 'vee-validate/dist/rules';

// Rules
extend('required', required);

extend('mustBeUrl', (value: string): boolean => {
  return /^https?:\/\/.+/.test(value);
});

extend('bothPasswordsSame', {
  params: ['target'],
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  validate(value, { target }) {
    return value === target;
  }
});

const veeValidate: Plugin = ({ app }) => {
  configure({
    defaultMessage: (_field, values) => {
      // values._field_ = app.i18n.t(`fields.${field}`);
      return app.i18n.t(`validation.${values._rule_}`, values);
    }
  });
};
export default veeValidate;
