<script setup lang="ts">
import { CButton } from '../components'
import { LBox, LHeader, LMain } from '../components/Layouts'
</script>

<template>
  <div class="p-main">
    <LHeader />
    <LMain>
      <LBox>
        <CButton text="m button text" />
      </LBox>
    </LMain>
  </div>
</template>

<style lang="scss">

</style>
