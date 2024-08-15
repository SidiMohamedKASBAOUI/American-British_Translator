const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');

suite('Unit Tests', () => {
    const translator = new Translator();

    suite('American to British English', function() {
        test('Translate Mangoes are my favorite fruit.', function() {
            const input = 'Mangoes are my favorite fruit.';
            const expected = 'Mangoes are my <span class="highlight">favourite</span> fruit.';
            assert.strictEqual(translator.tAMB(input), expected);
        });

        test('Translate I ate yogurt for breakfast.', function() {
            const input = 'I ate yogurt for breakfast.';
            const expected = 'I ate <span class="highlight">yoghurt</span> for breakfast.';
            assert.strictEqual(translator.tAMB(input), expected);
        });

        test('Translate We had a party at my friend\'s condo.', function() {
            const input = 'We had a party at my friend\'s condo.';
            const expected = 'We had a party at my friend\'s <span class="highlight">flat.</span>';
            assert.strictEqual(translator.tAMB(input), expected);
        });

        test('Translate Can you toss this in the trashcan for me?', function() {
            const input = 'Can you toss this in the trashcan for me?';
            const expected = 'Can you toss this in the <span class="highlight">bin</span> for me?';
            assert.strictEqual(translator.tAMB(input), expected);
        });

        test('Translate The parking lot was full.', function() {
            const input = 'The parking lot was full.';
            const expected = 'The <span class="highlight">car park</span> was full.';
            assert.strictEqual(translator.tAMB(input), expected);
        });

        test('Translate Like a high tech Rube Goldberg machine.', function() {
            const input = 'Like a high tech Rube Goldberg machine.';
            const expected = 'Like a high tech <span class="highlight">heath Robinson device</span>.';
            assert.strictEqual(translator.tAMB(input), expected);
        });

        test('Translate To play hooky means to skip class or work.', function() {
            const input = 'To play hooky means to skip class or work.';
            const expected = 'To <span class="highlight">bunk off</span> means to skip class or work.';
            assert.strictEqual(translator.tAMB(input), expected);
        });

        test('Translate No Mr. Bond, I expect you to die.', function() {
            const input = 'No Mr. Bond, I expect you to die.';
            const expected = 'No <span class="highlight">Mr</span> Bond, I expect you to die.';
            assert.strictEqual(translator.tAMB(input), expected);
        });

        test('Translate Dr. Grosh will see you now.', function() {
            const input = 'Dr. Grosh will see you now.';
            const expected = '<span class="highlight">Dr</span> Grosh will see you now.';
            assert.strictEqual(translator.tAMB(input), expected);
        });

        test('Translate Lunch is at 12:15 today.', function() {
            const input = 'Lunch is at 12:15 today.';
            const expected = 'Lunch is at <span class="highlight">12.15</span> today.';
            assert.strictEqual(translator.tAMB(input), expected);
        });
    });

    suite('British to American English', function() {
        test('Translate We watched the footie match for a while.', function() {
            const input = 'We watched the footie match for a while.';
            const expected = 'We watched the <span class="highlight">soccer</span> match for a while.';
            assert.strictEqual(translator.tBAM(input), expected);
        });

        test('Translate Paracetamol takes up to an hour to work.', function() {
            const input = 'Paracetamol takes up to an hour to work.';
            const expected = '<span class="highlight">Tylenol</span> takes up to an hour to work.';
            assert.strictEqual(translator.tBAM(input), expected);
        });

        test('Translate First, caramelise the onions.', function() {
            const input = 'First, caramelise the onions.';
            const expected = 'First, <span class="highlight">caramelize</span> the onions.';
            assert.strictEqual(translator.tBAM(input), expected);
        });

        test('Translate I spent the bank holiday at the funfair.', function() {
            const input = 'I spent the bank holiday at the funfair.';
            const expected = 'I spent the <span class="highlight">public holiday</span> at the <span class="highlight">carnival.</span>';
            assert.strictEqual(translator.tBAM(input), expected);
        });

        test('Translate I had a bicky then went to the chippy.', function() {
            const input = 'I had a bicky then went to the chippy.';
            const expected = 'I had a <span class="highlight">cookie</span> then went to the <span class="highlight">fish-and-chip shop.</span>';
            assert.strictEqual(translator.tBAM(input), expected);
        });

        test('Translate I\'ve just got bits and bobs in my bum bag.', function() {
            const input = 'I\'ve just got bits and bobs in my bum bag.';
            const expected = 'I\'ve just got <span class="highlight">odds and ends</span> in my <span class="highlight">fanny pack</span>.';
            assert.strictEqual(translator.tBAM(input), expected);
        });

        test('Translate The car boot sale at Boxted Airfield was called off.', function() {
            const input = 'The car boot sale at Boxted Airfield was called off.';
            const expected = 'The <span class="highlight">swap meet</span> at Boxted Airfield was called off.';
            assert.strictEqual(translator.tBAM(input), expected);
        });

        test('Translate Have you met Mrs Kalyani?', function() {
            const input = 'Have you met Mrs Kalyani?';
            const expected = 'Have you met <span class="highlight">Mrs.</span> Kalyani?';
            assert.strictEqual(translator.tBAM(input), expected);
        });

        test('Translate Prof Joyner of King\'s College, London.', function() {
            const input = 'Prof Joyner of King\'s College, London.';
            const expected = '<span class="highlight">Prof.</span> Joyner of King\'s College, London.';
            assert.strictEqual(translator.tBAM(input), expected);
        });

        test('Translate Tea time is usually around 4 or 4.30.', function() {
            const input = 'Tea time is usually around 4 or 4.30.';
            const expected = 'Tea time is usually around 4 or <span class="highlight">4:30</span>.';
            assert.strictEqual(translator.tBAM(input), expected);
        });
    });

    suite('Highlight Translations', function() {
        test('Highlight translation in Mangoes are my favorite fruit.', function() {
            const input = 'Mangoes are my favorite fruit.';
            const expected = 'Mangoes are my <span class="highlight">favourite</span> fruit.';
            assert.strictEqual(translator.tAMB(input), expected);
        });

        test('Highlight translation in I ate yogurt for breakfast.', function() {
            const input = 'I ate yogurt for breakfast.';
            const expected = 'I ate <span class="highlight">yoghurt</span> for breakfast.';
            assert.strictEqual(translator.tAMB(input), expected);
        });

        test('Highlight translation in We watched the footie match for a while.', function() {
            const input = 'We watched the footie match for a while.';
            const expected = 'We watched the <span class="highlight">soccer</span> match for a while.';
            assert.strictEqual(translator.tBAM(input), expected);
        });

        test('Highlight translation in Paracetamol takes up to an hour to work.', function() {
            const input = 'Paracetamol takes up to an hour to work.';
            const expected = '<span class="highlight">Tylenol</span> takes up to an hour to work.';
            assert.strictEqual(translator.tBAM(input), expected);
        });
    });
});
