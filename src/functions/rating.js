import React from 'react'
import StarRating from 'react-star-ratings'

//1 4 5 3  how reduce fn works reduce(previous, next)=> p+n, 0//initial value
//first iterattion-- 1+4 5 3
//second 5+5 3
//third 13
export const showAverage=(p)=>{
    if(p && p.ratings){
        let ratingsArray=p && p.ratings
        let total=[]
        let length=ratingsArray.length

        ratingsArray.map((r)=> total.push(r.star))
        let totalReduced=total.reduce((p,n)=> p+n,0)

        let highest=length*5;
        //console.log(highest)
        let result=(totalReduced*5)/highest

        return (
            <div className='text-center pt-1 pb-3'> 
                <span>
                    <StarRating starDimension='20px' starSpacing='2px' starRatedColor='red' rating={result} editing={false}/>
                    {" "}({p.ratings.length})
                </span>
              
            </div>
          )
    }
}


