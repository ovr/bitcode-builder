import * as assert from 'assert';

import * as values from '../';
import { Instruction } from './base';
import { getAggrFieldType } from './common';

// TODO(indutny): support more indices?
export class InsertValue extends Instruction {
  constructor(public readonly aggr: values.Value,
              public readonly element: values.Value,
              public readonly index: values.constants.Constant) {
    super(aggr.ty, 'insertvalue', [ aggr, element, index ]);

    const fieldType = getAggrFieldType(aggr.ty, index);
    assert(fieldType.isEqual(element.ty),
      'element type doesn\'t match field type in `insertvalue`');
  }
}
