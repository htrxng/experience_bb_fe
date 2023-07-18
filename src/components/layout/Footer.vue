<template>
    <div>
      <p class="footerSeparator">EXPERIENCIA</p>
    </div>
</template>

<script>
    export default {
        name: "Footer"
    };
</script>

<style scoped>
  .footerSeparator {
    display: flex;
    align-items: center;
    text-align: center;
    color: white;
    background-color: blue;
    font-size: 50px;
    font-weight: bold ;
  }

  .footerSeparator::before,
  .footerSeparator::after {
    content: '';
    flex: 1;
    border-bottom: 3px solid #FFFFFF;
  }

  .footerSeparator:not(:empty)::before {
    margin-right: .25em;
  }

  .footerSeparator:not(:empty)::after {
    margin-left: .25em;
  }

</style>
