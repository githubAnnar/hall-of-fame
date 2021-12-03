import { GenderPipe } from './gender.pipe';

describe('SexPipe', () => {
  it('create an instance', () => {
    const pipe = new GenderPipe();
    expect(pipe).toBeTruthy();
  });
});
