import * as assert from 'assert';

import { Signature } from '../types';
import { Argument } from '../values';
import { BasicBlock } from './basic-block';
import { Declaration } from './declaration';

export class Func extends Declaration {
  public readonly body: BasicBlock = this.createBlock();
  private readonly paramMap: Map<string, number> = new Map();

  constructor(signature: Signature, name: string,
              private readonly paramNames: string[]) {
    super(signature, name);
    assert.strictEqual(paramNames.length, signature.paramCount,
      'Invalid number of parameter names, doesn\'t match signature');

    paramNames.forEach((paramName, i) => {
      if (this.paramMap.has(paramName)) {
        throw new Error(`Duplicate parameter name: "${paramName}"`);
      }

      this.paramMap.set(paramName, i);
    });
  }

  public createBlock(name: string | null = null) {
    return new BasicBlock(this, name);
  }

  public getArgument(name: string): Argument {
    assert(this.paramMap.has(name), `Unknown parameter name: "${name}"`);

    const index = this.paramMap.get(name) as number;
    return new Argument(this.ty.toSignature().getParam(index), index);
  }
}
