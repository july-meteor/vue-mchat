<template>
  <i :class="'m-icon-' + name"></i>
</template>

<script>
  export default {
    name: 'MIcon',

    props: {
      name: String
    }
  };
</script>
