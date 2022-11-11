import { v2 as cloudinary } from 'cloudinary'
 import {fileUpload} from '../../src/helpers/fileUpload';

 cloudinary.config({
    cloud_name:'djlngmmtz',
    api_key:'821786923775212',
    api_secret:'rxtiAqdBe19QXv358toouZmZ_K8',
    secure:true

 });

describe('prueba', () => { 

 test('should first',async () =>  {

    const imageURL = 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg'
    const resp = await fetch(imageURL);
    const blob= await resp.blob();
    const file = new File([blob], 'Photo.jpg');

 
    const url = await fileUpload (file);
    expect (typeof url).toBe('string') 
    //console.log(url)
    const segments = url.split('/');
    const imageId = segments[segments.length - 1].replace('.jpg','');
   // console.log({imageId})
  const cloudResp= await cloudinary.api.delete_resources([ 'journal/'+ imageId], {
    resource_type:'image'
   });
  // console.log({cloudResp})
  })
  
  test('Debe de retornar null', async() => { 
 
    const files = new File([], 'Photo.jpg');
    const url= await fileUpload(files);
    expect (url).toBe(null)
   })
 })
 
