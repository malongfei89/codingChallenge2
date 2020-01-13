<template>
  <div id="app" class="container">
    <ButtonGroup :btns="infoOfBtn" @addColor="addColor"/>
    <Display :numOfSpans="numOfSpans" :spanNeedColor="spanNeedColor"/>
  </div>
</template>

<script>
import ButtonGroup from './components/ButtonGroup.vue'
import Display from './components/Display.vue'
import service from './service/service'

export default {
  data:()=>{
    return {
      infoOfBtn: null,
      numOfSpans: 0,
      spanNeedColor: [],
      visitedType: [],
      pool: []
    }
  },
  name: 'app',
  components: {
    ButtonGroup,
    Display
  },
  async mounted(){
    try {
      let result = (await service.getAll()).data
      this.infoOfBtn = result.listOfTypes
      this.numOfSpans = result.total
      for(let i=0;i<this.numOfSpans;i++) this.pool.push(i)
    } catch(error){
      console.log(error)
    }
  },
  methods:{
    async addColor(e){
      if(this.visitedType.includes(e)){
        this.spanNeedColor=JSON.parse(sessionStorage.getItem(e))
      }
      else{
        let numOfThisType = (await service.getNumByType(e)).data.numOfThisType
        let step = Math.floor(this.numOfSpans/numOfThisType)
        let startIndex = this.infoOfBtn.findIndex(item => item===e)
        let answer=[]
        for(let i = 0;i< numOfThisType;i++){
          while(startIndex>= this.pool.length || this.pool[startIndex]===null){
              if(startIndex >= this.pool.length){
                  startIndex = this.pool.findIndex(item => item !== null)
                  break
              } else startIndex++
          }
          answer.push(startIndex)
          this.pool[startIndex]=null
          startIndex+=step
        }
        this.spanNeedColor=answer
        this.visitedType.push(e)
        sessionStorage.setItem(e, JSON.stringify(this.spanNeedColor))
      }
    }
  }
}
</script>

<style>

</style>
