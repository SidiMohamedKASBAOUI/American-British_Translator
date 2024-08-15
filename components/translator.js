const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {
    tAMB(text){
        
        // let wordsOnly = result.map(word=>{
        //     word.toLowerCase().replace(/^[.,!?;:]+|[.,!?;:]+$/g, ''); 
        // })
        
        const multiWordPhrases = Object.keys(americanOnly).filter(phrase => phrase.includes(' '));

        let translatedWord =''; 
        let updatedText = text;
        updatedText = updatedText.replace(/\b(\d{1,2}):(\d{2})\b/g, (match, p1, p2) => `<span class="highlight">${p1}.${p2}</span>`);
        multiWordPhrases.forEach(phrase => {
            const regex = new RegExp(phrase, 'gi');
            updatedText = updatedText.replace(regex, `<span class="highlight">${americanOnly[phrase]}</span>`);
        });
        let textArray = updatedText.split(/(\s+|[,!?;:]+)/).filter(Boolean);

        console.log(textArray)


        let translatedTextArray = textArray.map(word=>{
            //word = word.trim();
            //console.log(word); 
            //console.log(word.toLowerCase() + '.');
            //let title = word.toLowerCase() ;
        //console.log(multiWordPhrases);

    
            if (/\w/.test(word)) {
                const lowerCaseWord = word.toLowerCase();
                // Check for multi-word phrases
                let originalWord = word; // Store original word to check for changes
                //let isTranslated = false;

                
                if(lowerCaseWord in americanToBritishTitles){ 
                    translatedWord = americanToBritishTitles[lowerCaseWord]
                    translatedWord = `<span class="highlight">${translatedWord.charAt(0).toUpperCase() + translatedWord.slice(1)}</span>`;

                }
                else{
                    if (lowerCaseWord.endsWith('.')) {
                        // The word ends with a period
                        const lowerCaseWordWithoutPeriod = lowerCaseWord.slice(0, -1);
                        // Translate the word without the period
                        translatedWord = americanOnly[lowerCaseWordWithoutPeriod] ||
                            americanToBritishSpelling[lowerCaseWordWithoutPeriod] ||
                             lowerCaseWordWithoutPeriod;

                            // Add the period back to the translated word
                        translatedWord += '.';
                       // isTranslated = translatedWord !== lowerCaseWord;

                    }
                else{translatedWord = americanOnly[lowerCaseWord] || americanToBritishSpelling[lowerCaseWord]  ||lowerCaseWord;}
            }
                if (word[0] === word[0].toUpperCase()) {
                    // Capitalize the first letter of translatedWord
                    return translatedWord.charAt(0).toUpperCase() + translatedWord.slice(1);
                } 
                if (translatedWord.toLowerCase() !== originalWord.toLowerCase() && !translatedWord.includes('<span class="highlight">')) {
                    translatedWord = `<span class="highlight">${translatedWord}</span>`;
                }
    
                return translatedWord;
            
        } else {
            // Return punctuation and whitespace unchanged
            return word;
        }
        
    })
            return translatedTextArray.join('');

    }
     tBAM(text) {
        const britishToAmericanSpelling = Object.fromEntries(
            Object.entries(americanToBritishSpelling).map(([key, value]) => [value, key])
        );

        const britishToAmericanTitles = Object.fromEntries(
            Object.entries(americanToBritishTitles).map(([key, value]) => [value, key])
        );

        let translatedWord = '';
        let updatedText = text;
    
        // Change British time format (HH.mm) to American time format (HH:mm)
        updatedText = updatedText.replace(/\b(\d{1,2})\.(\d{2})\b/g, (match, p1, p2) => `<span class="highlight">${p1}:${p2}</span>`);
    
        // Handle multi-word phrases in the britishOnly dictionary
        const multiWordPhrases = Object.keys(britishOnly).filter(phrase => phrase.includes(' '));
        multiWordPhrases.forEach(phrase => {
            const regex = new RegExp(phrase, 'gi');
            updatedText = updatedText.replace(regex, `<span class="highlight">${britishOnly[phrase]}</span>`);
        });
    
        // Split text into words and punctuation
        let textArray = updatedText.split(/(\s+|[,!?;:]+)/).filter(Boolean);
        console.log(textArray);
    
        let translatedTextArray = textArray.map(word => {
            if (/\w/.test(word)) {
                const lowerCaseWord = word.toLowerCase();
                let originalWord = word;
    
                if (lowerCaseWord in britishToAmericanTitles) {
                    translatedWord = britishToAmericanTitles[lowerCaseWord];
                    translatedWord = `<span class="highlight">${translatedWord.charAt(0).toUpperCase() + translatedWord.slice(1)}</span>`;
                }
                else{ if (lowerCaseWord.endsWith('.')) {
                    // The word ends with a period
                    const lowerCaseWordWithoutPeriod = lowerCaseWord.slice(0, -1);
                    // Translate the word without the period
                    translatedWord = britishOnly[lowerCaseWordWithoutPeriod] ||
                        britishToAmericanSpelling[lowerCaseWordWithoutPeriod] ||
                         lowerCaseWordWithoutPeriod;

                        // Add the period back to the translated word
                    translatedWord += '.';
                   // isTranslated = translatedWord !== lowerCaseWord;

                }
                else if (lowerCaseWord in britishOnly) {
                    translatedWord = `<span class="highlight">${britishOnly[lowerCaseWord]}</span>`;
                } else if (lowerCaseWord in britishToAmericanSpelling) {
                    translatedWord = `<span class="highlight">${britishToAmericanSpelling[lowerCaseWord]}</span>`;
                } else {
                    translatedWord = word;
                }    }
                // Capitalize the first letter of translatedWord if the original word was capitalized
                if (word[0] === word[0].toUpperCase()) {
                    translatedWord = translatedWord.charAt(0).toUpperCase() + translatedWord.slice(1);
                }
                // Wrap translated word with <span class="highlight">
                if (translatedWord.toLowerCase() !== originalWord.toLowerCase() && !translatedWord.includes('<span class="highlight">')) {
                    return `<span class="highlight">${translatedWord}</span>`;
                }
    
                return translatedWord;
            } else {
                // Return punctuation and whitespace unchanged
                return word;
            }
        });
    
        return translatedTextArray.join('');
    }

}

module.exports = Translator;