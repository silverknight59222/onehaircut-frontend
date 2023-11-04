// ** Mock Adapter
import mock from '@/@fake-db/mock'

export type IconsDataType = {
  icon: string
}

const icons: IconsDataType[] = [
  { icon: 'alien' },
  { icon: 'armchair' },
  { icon: 'badge-wc' },
  { icon: 'ghost-2' },
  { icon: 'whirl' }
]

mock.onGet('/api/icons/data').reply(() => {
  return [200, icons]
})
