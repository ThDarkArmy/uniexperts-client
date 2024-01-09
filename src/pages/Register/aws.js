import AWS from 'aws-sdk';

AWS.config.update({
  region: 'ap-south-1',
  accessKeyId: 'AKIAVN5B7DYHFC5JDHVR',
  secretAccessKey: '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',
});

export default new AWS.S3();
