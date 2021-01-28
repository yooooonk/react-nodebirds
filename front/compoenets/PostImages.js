import PropTypes from 'prop-types'
import {PlusOutlined} from '@ant-design/icons'
import { useCallback, useState } from 'react';
import ImagesZoom from './imagesZoom';
import { backUrl } from '../config/config';
const PostImages = ({images})=>{

    const [showImagesZoom, setShowImagesZoom] = useState(false)

    const onZoom = useCallback(()=>{
        setShowImagesZoom(true)
    },[])
    
    const onClose = useCallback(()=>{                
        setShowImagesZoom(false)        
    },[])


    if(images.length === 1){
        return(
            <>
                <img role="presentation" src={`${backUrl}/${images[0].src}`} alt={images[0].src} onClick={onZoom}/>               
                {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
            </>
        )
    }

    if(images.length === 2){        
        return(
            <>
                <img role="presentation" width="50%" src={`${backUrl}/${images[0].src}`} alt={images[0].src} onClick={onZoom}/>               
                <img role="presentation" width="50%" src={`${backUrl}/${images[1].src}`} alt={images[1].src} onClick={onZoom}/>               
                {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
            </>
        )
    }

    return (
        <div style={{display:'flex', alignItems:'center', justifyContent:'center' }}>
            <img role="presentation" width="50%" src={`${backUrl}/${images[0].src}`} alt={images[0].src} onClick={onZoom}/>               
            <div 
                role="presentation"
                style={{display:'inline-block', width:'50%', textAlign:'center', verticalAlign:'middle'}}
                onClick={onZoom}
            >   
                <PlusOutlined />
                <br/>
                {images.length-1}개 더보기
            </div>
                {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
        </div>
    )

    
};

PostImages.propTypes = {
    images : PropTypes.arrayOf(PropTypes.object),
}

export default PostImages;