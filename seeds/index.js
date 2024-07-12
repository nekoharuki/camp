const mongoose=require('mongoose')
const cities=require('./cities')
const Campground=require('../models/campground')
const {descriptors,places}=require('./seedHelpers');


mongoose.connect('mongodb://localhost:27017/yelp-camp', { useNewUrlParser: true, useUnifiedTopology: true ,useCreateIndex:true})
.then(()=>{
    console.log('コネクト成功');
}).catch((err)=>{
    console.log('コネクト失敗');
    console.log(err);
})

const sample=(array)=>{
    const a=Math.floor(Math.random()*array.length );
    return array[a];
}

const seedDB=async()=>{
    await Campground.deleteMany({});
    for(let i=0;i<50;i++){
        const randomCityIndex=Math.floor(Math.random()*cities.length);
        const price=Math.floor(Math.random()*3000)+1000;
        const camp=new Campground({
            author:'6607c1cc61df0d2a9ca37792',
            location: `${cities[randomCityIndex].prefecture}${cities[randomCityIndex].city}`,
            title:`${sample(descriptors)}・${sample(places)}`,
            description:'吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。しかもあとで聞くとそれは書生という人間中で一番獰悪な種族であったそうだ。この書生というのは時々我々を捕えて煮て食うという話である。しかしその当時は何という考もなかったから別段恐しいとも思わなかった。ただ彼の掌に載せられてスーと持ち上げられた時何だかフワフワした感じがあったばかりである。掌の上で少し落ちついて書生の顔を見たのがいわゆる人間というものの見始であろう。この時妙なものだと思った感じが今でも残っている。第一毛をも',
            geometry:{
                type:('Point'),
                coordinates:[
                    cities[randomCityIndex].longitude,
                    cities[randomCityIndex].latitude,
                    

                ]
            },
            price,
            images:[
            {
            url: 'https://res.cloudinary.com/dxy0qith7/image/upload/v1711977285/YelpCamp/bz6clki69um9rfrof9po.png',
            filename: 'YelpCamp/bz6clki69um9rfrof9po'
          },
        {
            url: 'https://res.cloudinary.com/dxy0qith7/image/upload/v1712210962/YelpCamp/inwosveenw46bwk6xvwi.png',
            filename: 'YelpCamp/inwosveenw46bwk6xvwi'
        }
        ]
})
        await camp.save()
    }
}
seedDB().then(()=>{
    mongoose.connection.close();
})