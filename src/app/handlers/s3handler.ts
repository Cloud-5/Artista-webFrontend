import AWS from "aws-sdk";

const bucket = new AWS.S3(
  {
    accessKeyId: 'AKIA3FLDZ3RWSJRJ5UNX',
    secretAccessKey: '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',
    region: 'ap-south-1'
  }
);

// Function to upload a file to S3
export async function uploadFileToS3(file: File): Promise<string> {
  const contentType = file.type;
  const bucketName = 'test-artista'
  
  const params = {
    Bucket: bucketName,
    Key: file.name,
    Body: file,
    ContentType: contentType
  };

  return new Promise((resolve, reject) => {
    bucket.upload(params, (err: any, data: { Location: string | PromiseLike<string>; }) => {
      if (err) {
        console.log('There was an error uploading your file: ', err);
        reject(err);
      } else {
        console.log('Successfully uploaded file.', data);
        resolve(data.Location); // returning the url
      }
    });
  });

  //for upload progress   
  /*bucket.upload(params).on('httpUploadProgress', function (evt) {
            console.log(evt.loaded + ' of ' + evt.total + ' Bytes');
        }).send(function (err, data) {
            if (err) {
                console.log('There was an error uploading your file: ', err);
                return false;
            }
            console.log('Successfully uploaded file.', data);
            return true;
        });*/
}


