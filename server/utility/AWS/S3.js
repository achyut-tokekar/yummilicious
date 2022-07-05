import AWS from 'aws-sdk';

const s3Bucket = new AWS.S3({
    accessKeyId: "AKIAZIDWF76OOJBYTHOW",
    secretAccessKey: "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",
    region: "ap-south-1"
});

export const S3Upload = (options) => {
    return new Promise((resolve, reject) => {
        s3Bucket.upload(options, (error, data) => {
            if (error) return reject(error);
            return resolve(data);
        })
    });
};