import React from 'react';
import Form from './ApplicationForm';
import Input from '../inputs/Input';

export default class Form4 extends Form {
  static title = 'Auto-add and auto-remove inputs on value change';
  static description = `This form has a standard 'fullName' input for a
    person's name and a number (at least one) of inputs for 'favoriteLanguages'
    values. Whenever new value is entered, additional input will appear. Also,
    whenever value is erased, it's input gets removed. To achieve this behavior
    two helper methods were used: \`mapExtraIn\` when rendering, and \`spliceIn\`
    in onChange handler.
  `;
  static source = `
    import Form, { Input } from 'form';

    class Form4 extends Form {
      $language(i, value) {
        if (value) {
          return this.set(\`favoriteLanguages.\${i}\`, value);
        } else {
          return this.spliceIn('favoriteLanguages', i);
        }
      }

      render() {
        return (
          <div>
            <Input {...this.input('fullName')} placeholder="Full Name" />
            {this.mapExtraIn('favoriteLanguages', i =>
              <Input key={i} {...this.input(\`favoriteLanguages.\${i}\`)(this.$language, i)} placeholder={ \`Language \${i + 1}\` } />
            )}
          </div>
        );
      }
    }
  `;

  $language(i, value) {
    if (value) {
      return this.set(`favoriteLanguages.${i}`, value);
    } else {
      return this.spliceIn('favoriteLanguages', i);
    }
  }

  render() {
    return (
      <div>
        {this.renderExample()}

        <Input {...this.input('fullName')} placeholder="Full Name" />
        {this.mapExtraIn('favoriteLanguages', i =>
          <Input key={i} {...this.input(`favoriteLanguages.${i}`)(this.$language, i)} placeholder={ `Language ${i + 1}` } />
        )}
      </div>
    );
  }
}
