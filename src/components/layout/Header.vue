<template>
  <div id="header">
    <div id="top-header">
      <div id="logo">
        <div>Experiencia</div>
      </div>
      <div id="action-header">
        <div id="headerSearch">
          <text-input></text-input>
        </div>
        <div id="function-header">
          <div id="currency">
            <mdi-icon v-bind:color="iconColor" icon="mdi-menu-down"></mdi-icon>
          </div>
          <div id="login">
            <mdi-icon v-bind:color="iconColor" icon="mdi-account-circle-outline"></mdi-icon>
          </div>
          <div id="settings">
            <mdi-icon v-bind:color="iconColor" icon="mdi-cog-outline"></mdi-icon>
          </div>
        </div>
      </div>
    </div>
    <div id="navbar">
      <div id="Discover-Select" class="selectNavbar">
        <span id="discover-span">Discover</span>
        <mdi-icon icon="mdi-menu-down"></mdi-icon>
      </div>
      <div id="Public-Events-Select" class="selectNavbar">
        <span>Private Events</span>
        <mdi-icon icon="mdi-menu-down"></mdi-icon>
      </div>
      <div id="Commercial-Events-Select" class="selectNavbar">
        <span>Commercial Events</span>
        <mdi-icon icon="mdi-menu-down"></mdi-icon>
      </div>
      <div id="Excursion-Select" class="selectNavbar">
        <span>Excursion</span>
        <mdi-icon icon="mdi-menu-down"></mdi-icon>
      </div>
      <div id="Market-Place-Select" class="selectNavbar">
        <span>Market Place</span>
        <mdi-icon icon="mdi-menu-down"></mdi-icon>
      </div>
    </div>
  </div>
</template>

<script>
  import TextInput from "../text-fields/TextInput";
  import SvgIcon from "../icons/SvgIcon";
  import MdiIcon from "../icons/MdiIcon";

  export default {
    components: {
      "text-input": TextInput,
      MdiIcon,
      "svg-icon": SvgIcon,
    },
    data() {
      return {
        currency: ["USD", "EUR", "VND"],
        iconColor: 'white',
      };
    }
  };
</script>

<style scoped>
  #header {
    display: grid;
    grid-template-rows: 60fr 40fr;
    box-sizing: border-box;
  }

  #top-header {
    display: grid;
    grid-template-columns: 1fr 5fr;
    background-color: #43A047;
    color: #FFFFFF;
  }

  #action-header {
    display: flex;
  }


  #logo {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-family: Allerta Stencil, serif;
    font-size: 40px;
    font-weight: bold;
  }

  #headerSearch {
    width: 70%;
    height: 100%;
    display: flex;
  }

  #function-header {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 2fr;
    width: 100%;
    align-content: center;
  }

  #navbar {
    background-color: aquamarine;
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
  }

  .selectNavbar {
    padding: 5px;
    display: flex;
  }

  #Public-Events-Select {
    font-size: 24px;
    border-bottom: 4px solid #43A047;
  }
</style>
