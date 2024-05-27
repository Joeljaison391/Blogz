import { BlobServiceClient } from '@azure/storage-blob';

const account = 'blogz'
const sasToken = process.env.REACT_APP_AZURE_STORAGE_SAS_TOKEN// const blobServiceClient = new BlobServiceClient(`https://${account}.blob.core.windows.net/?${sasToken}`); 
const containerName = "img";

export const uploadImageToAzure = async (file: File): Promise<string | null> => {
  try {
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
