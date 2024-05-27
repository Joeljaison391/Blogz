import { BlobServiceClient } from '@azure/storage-blob';

const account = 'blogz'
const sasToken = "sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2026-05-27T16:28:03Z&st=2024-05-27T08:28:03Z&spr=https,http&sig=VIaz7HcdTweAYFr0mC9Y0RnNXvP41RtafwxjGosCTzo%3D"
// const blobServiceClient = new BlobServiceClient(`https://${account}.blob.core.windows.net/?${sasToken}`); 
const containerName = "img";

export const uploadImageToAzure = async (file: File): Promise<string | null> => {
  try {
    // const blobServiceClient = new BlobServiceClient(`https://blogz.blob.core.windows.net/?sv=2022-11-02&ss=bfqt&srt=sc&sp=rwdlacupiytfx&se=2026-05-27T16:28:03Z&st=2024-05-27T08:28:03Z&spr=https,http&sig=4Iqq2pL8N94Gus5ADtrVPWuiyiEeb75BTkxoTibXY6k%3D`);
    const blobServiceClient = new BlobServiceClient(`https://${account}.blob.core.windows.net/?${sasToken}`); 
    const containerClient = blobServiceClient.getContainerClient(containerName);
    console.log(containerClient)
    const blobName = new Date().getTime() + '-' + file.name;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    const uploadBlobResponse = await blockBlobClient.uploadData(file, {
      blobHTTPHeaders: { blobContentType: file.type }
    });
    console.log(`Upload block blob ${blobName} successfully`, uploadBlobResponse.requestId);

    const blobUrl = blockBlobClient.url
    // console.log(blockBlobClient.url)
    
    return blobUrl;
  } catch (error) {
    console.error('Error uploading image to Azure:', error);
    return null;
  }
};
