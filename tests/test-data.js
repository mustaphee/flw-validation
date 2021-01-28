module.exports = {
  homeData: {
    name: 'Yusuff Mustapha',
    github: '@mustaphee',
    email: 'officialwebdev@gmail.com',
    mobile: '08160532895',
    twitter: '@dev_inately',
  },
  example1: {
    rule: {
      field: 'missions.count',
      condition: 'gte',
      condition_value: 30,
    },
    data: {
      name: 'James Holden',
      crew: 'Rocinante',
      age: 34,
      position: 'Captain',
      missions: {
        count: 45,
        successful: 44,
        failed: 1,
      },
    },
  },

  example2: {
    rule: {
      field: '0',
      condition: 'eq',
      condition_value: 'a',
    },
    data: 'damien-marley',
  },

  example3: {
    rule: {
      field: '5',
      condition: 'contains',
      condition_value: 'rocinante',
    },
    data: ['The Nauvoo', 'The Razorback', 'The Roci', 'Tycho'],
  },

  example4: {
    rule: {
      field: 'zoo.2',
      condition: 'contains',
      condition_value: 'The Roci',
    },
    data: {
      zoo: ['The Nauvoo', 'The Razorback', 'The Roci', 'Tycho'],
    },
  },

  example5: {
    rule: {
      field: 'zoo.2',
      condition: 'eq',
      condition_value: null,
    },
    data: {
      zoo: ['The Nauvoo', 'The Razorback', null, 'Tycho'],
    },
  },

  example6: {
    rule: {
      field: 'zoo.2',
      condition: 'gte',
      condition_value: null,
    },
    data: {
      zoo: ['The Nauvoo', 'The Razorback', null, 'Tycho'],
    },
  },

  example7: {
    rule: {
      field: 'zoo.cage',
      condition: 'neq',
      condition_value: '10',
    },
    data: {
      zoo: {
        cage: 10,
      },
    },
  },

};
