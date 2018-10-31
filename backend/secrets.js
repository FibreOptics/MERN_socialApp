const secrets = {
    dbUri: 'mongodb://FibreOptics:abxy1234@ds032887.mlab.com:32887/mern'
    //dbUri: process.env.DB_URI
};
  
export const getSecret = key => secrets[key];