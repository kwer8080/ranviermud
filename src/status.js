// A file of helper functions for getting player/npc status-related strings.
//TODO: Dry this up and extract it as needed.
module.exports = {
  getHealthText: getHealthText,
  getSanityText: getSanityText,
  getGenderNoun: getGenderNoun
};

function getHealthText(maxHealth, entity) {
  return function(health) {
    var percentage = Math.floor((health / maxHealth) * 100);
    var isPlayer = entity.toString() === '[object Player]';
    var noun = isPlayer ? getGenderNoun(entity.getGender()) : 'creature';
    var healthStatus = {
      0: 'a dead ' + noun + ' walking',
      5: 'hanging by a thread',
      10: 'in excruciating pain',
      15: 'wracked by pain',
      25: 'maimed',
      35: 'gravely wounded',
      50: 'wounded',
      60: 'in awful shape',
      70: 'feeling poor',
      80: 'in average health',
      90: 'in good health',
      95: 'in great health',
      100: 'in perfect health'
    };
    var nounPhrase = isPlayer ? 'You are ' : entity.getShortDesc(locale) +
      ' is ';
    var color = getStatusColor(percentage);
    for (var tier in healthStatus) {
      if (percentage <= parseInt(tier)) {
        return '<' + color + '>' + nounPhrase + healthStatus[tier] +
          '.</' + color + '>';
      }
    }
  }
}

function getSanityText(maxSanity, isPlayer) {
  return function(sanity) {
    var percentage = Math.floor((sanity / maxSanity) * 100);
    var sanityStatus = {
      0: 'CONSUMED by __❤z☀a☆l☂t☻h☯o☭r))<<',
      5: 'hanging by a thread',
      10: 'nearing insanity',
      15: 'seeing unrealities',
      25: 'perceiving the unperceivable',
      35: 'feeling dysphoric',
      50: 'stressed to breaking',
      60: 'mentally unsound',
      70: 'feeling stressed',
      80: 'discontent',
      90: 'mentally well',
      95: 'quite stable',
      100: 'sharp as a knife'
    };

    var color = getStatusColor(percentage);
    for (var tier in sanityStatus) {
      if (percentage <= parseInt(tier)) {
        return '<' + color + '>You are ' + sanityStatus[tier] +
          '.</' + color + '>';
      } //TODO: Dry this, too.
    }
  }
}

function getGenderNoun(gender) {
  var nouns = {
    M: 'man',
    F: 'woman',
    A: 'person'
  };
  return nouns[gender] || nouns.A;
}

function getStatusColor(percentage) {
  return percentage > 50 ? 'green' : 'red'
}