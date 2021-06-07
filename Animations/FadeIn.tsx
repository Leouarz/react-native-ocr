import  React, {useState, useEffect, Children} from 'react'
import { Animated, Dimensions } from 'react-native'

export default function FadeIn(props:{children:React.ReactNode}){
    const [positionLeft, setPositionLeft] = useState(new Animated.Value(Dimensions.get('window').width))
    useEffect(() => {
        Animated.spring(positionLeft,{
            toValue:0,
            useNativeDriver: false
        }).start()
    }, [])
    return(
        <Animated.View
            style={{left: positionLeft}}
        >
            {props.children}
        </Animated.View>
    )
}