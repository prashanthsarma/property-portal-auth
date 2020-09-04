// Ideally shouldn't be part of client code but dependeing on the env the appropriate 
// config should get included

interface IEnvConfig {
  BASE_URL: string;
}

interface IConfig {
  production: IEnvConfig;
  development: IEnvConfig;
  test: IEnvConfig;
}

const config: IConfig = {
  production: {
    BASE_URL: 'https://a7ed5a6cd31d94ebf86b32aae283b942-69471a12aa9be2af.elb.us-west-2.amazonaws.com'
  },
  development: {
    BASE_URL: 'https://a7ed5a6cd31d94ebf86b32aae283b942-69471a12aa9be2af.elb.us-west-2.amazonaws.com'
  },
  test: {
    BASE_URL: 'https://a7ed5a6cd31d94ebf86b32aae283b942-69471a12aa9be2af.elb.us-west-2.amazonaws.com'
  }
}

export const CurrentConfig :IEnvConfig  = config[process.env.NODE_ENV];