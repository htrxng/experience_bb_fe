<template>
    <fieldset id="fieldsetSearch">
      <mdi-icon icon="mdi-magnify" id="icon"> </mdi-icon>
      <input type="text" id="searchInputHeader">
    </fieldset>
</template>

<script>

  import SvgIcon from "../icons/SvgIcon";
  import MdiIcon from "../icons/MdiIcon";


    export default {
    components: {
      MdiIcon,
      'svg-icon': SvgIcon,
    },
      data() {
        return {
        };
      },
    };
</script>

<style scoped>
#searchInputHeader {
  width: 100%;
  height: 80%;
  flex-shrink: 0;
  display: inline;
  border-radius: 10px;
  border: 2px solid #43A047;
}
  #icon {
    position: absolute;
    top: 50%;
    left: 20px;
    transform: translateY(-50%);
    color: red;
  }
  #fieldsetSearch {
    display: flex;
    align-items: center;
    position: relative;
    border: none;
    flex: 1;
  }
</style>
