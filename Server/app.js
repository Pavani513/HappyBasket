const fs = require("fs");
const { google } = require("googleapis");

const auth = new google.auth.GoogleAuth({
  keyFile: "apikey.json",
  scopes: ["https://www.googleapis.com/auth/drive"],
});

const uploadFile = async (filePath, fileName, mimeType) => {
  const client = await auth.getClient();
  const drive = google.drive({ version: "v3", auth: client });

  const fileMetadata = {
    name: fileName,
    parents: ["1Xiu08OaNLQ_N0hGW4BA0_ACBNkGZ7wrx"], 
  };

  const media = {
    mimeType,
    body: fs.createReadStream(filePath),
  };

  const response = await drive.files.create({
    requestBody: fileMetadata,
    media,
    fields: "id",
  });

  const fileId = response.data.id;

  // Make the file public
  await drive.permissions.create({
    fileId,
    requestBody: {
      role: "reader",
      type: "anyone",
    },
  });

  const publicUrl = `https://drive.google.com/uc?id=${fileId}`;
  console.log("File Uploaded Successfully. Public URL:", publicUrl);
  return publicUrl;
};


module.exports=uploadFile
