import  React, {useState, useEffect, Children} from 'react'
import { Animated } from 'react-native'

export default function EnlargeShrink(props:{shouldEnlarge:boolean, children:React.ReactNode}){
    const getSize = () => props.shouldEnlarge ? 80 : 40
    const [viewSize, setViewSize] = useState(new Animated.Value(getSize()))
    useEffect(() => {
        Animated.spring(viewSize,{
            toValue:getSize(),
            useNativeDriver: false
        }).start()
    })
    return(
        <Animated.View
            style={{width: viewSize, height:viewSize}}
        >
            {props.children}
        </Animated.View>
    )
}