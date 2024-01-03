<script setup lang="ts">
import {
	VBtn,
	VIcon,
	VTable
} from 'vuetify/components'

import {
	mdiDeleteEmpty
} from '@mdi/js'

import { useWalletStore } from '../../stores/wallet'
const wallerStore = useWalletStore()
</script>

<template>
  <VTable
    v-if="wallerStore.balance.length"
    fixed-header
    rounded
  >
    <thead>
      <tr>
        <th class="text-left">
          Category
        </th>
        <th class="text-left">
          Date
        </th>
        <th class="text-left">
          Amount
        </th>
        <th />
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in wallerStore.balance"
        :key="item.date"
        :class="item.increase ? 'bg-green-darken-4' : ''"
      >
        <td><VIcon :icon="item.type.icon" /></td>
        <td>{{ item.date }}</td>
        <td>{{ item.amount }} UAH</td>
        <td class="text-right">
          <VBtn
            variant="text"
            @click="wallerStore.removeBalance(item.id)"
          >
            <VIcon
              color="red"
              :icon="mdiDeleteEmpty"
            />
          </VBtn>
        </td>
      </tr>
    </tbody>
  </VTable>
  <div
    v-if="!wallerStore.balance.length"
    class="text-center py-10"
  >List is empty</div>
</template>

<style scoped>

</style>
