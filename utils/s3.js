
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { fromBase64 } = require("@aws-sdk/util-base64-node");

const s3Client = new S3Client({
  region: process.env.REGION,
});
const bucketName = "ccalms";

const saveImageToS3 = async (image) => {
  try {
    const base64Data = image.buffer;

    if (!base64Data) {
      throw new Error("Base64 data is missing for image:", image.originalname);
    }

    
    const key = `cca-test/${Date.now()}-${image.originalname}`;

    const params = {
      Bucket: bucketName,
      Key: key,
      Body: image.buffer,
      ContentType:image.mimetype ,
      // ACL: "public-read",
    };

    const command = new PutObjectCommand(params);
    const result = await s3Client.send(command);
    console.log(result)
    const uploadedImage = {
      url: `https://${bucketName}.s3.amazonaws.com/${key}`,
    };
    console.log(uploadedImage)
    return uploadedImage;
  } catch (error) {
    console.error("Error uploading image to S3:", error);
    throw new Error("Error uploading image to S3");
  }
};

module.exports = saveImageToS3;