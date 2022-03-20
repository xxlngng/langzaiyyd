<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :md="6" :sm="6"> </a-col>
          <a-col :md="6" :sm="6">
            <a-form-item label="标题">
              <a-input placeholder="请输入标题" v-model="queryParam.datasourceTitle"></a-input>
            </a-form-item>
          </a-col>
		  <a-col :md="10" :sm="10">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" style="margin-left: 8px" icon="reload">重置</a-button>
              <a-button type="primary" @click="add" icon="plus" style="margin-left: 8px">导出</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <a-table
      ref="table"
      size="middle"
      bordered
      rowKey="id"
      :columns="columns"
      :dataSource="dataSource"
      :pagination="ipagination"
      :loading="loading"
      @change="handleTableChange"
    >
      <!-- 字符串超长截取省略号显示-->
      <span slot="description" slot-scope="text">
        <j-ellipsis :value="text" :length="30" />
      </span>
      <span slot="action" slot-scope="text, record">
        <a @click="edit(record)">编辑</a>
      </span>
    </a-table>

    <!-- <DatasourceModal ref="datasourceModal" @loadData="loadData" /> -->
  </a-card>
</template>

<script>
import { xlMixin } from '@/mixins/xlMixin'

export default {
  name: 'DatasourceConfig',
  mixins: [xlMixin],
  components: {},
  props: {},
  data() {
    return {
      columns: [
        {
          title: '标题',
          align: 'center',
          dataIndex: 'datasourceTitle'
          // scopedSlots: { customRender: 'description' }
        },
        {
          title: '类型',
          align: 'center',
          dataIndex: 'datasourceType'
          // scopedSlots: { customRender: 'description' }
        },
        {
          title: '创建人',
          align: 'center',
          dataIndex: 'createBy'
        },
        {
          title: '创建时间',
          align: 'center',
          dataIndex: 'createTime',
          customRender(val) {
            return val || '-'
          }
          // scopedSlots: { customRender: 'orderLevel' },
          // sorter: (a, b) => a.orderLevel - b.orderLevel
        },
        {
          title: '修改人',
          align: 'center',
          dataIndex: 'updateBy',
          customRender(val) {
            return val || '-'
          }
        },
        {
          title: '修改时间',
          align: 'center',
          dataIndex: 'updateTime',
          customRender(val) {
            return val || '-'
          }
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          width: 180,
          scopedSlots: { customRender: 'action' }
        }
      ],
      url: {
        list: '/Data_Manage/Data_Wo_Son_Fault/GetData_Wo_Son_FaultList'
      }
    }
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    edit(record) {
      this.$refs.datasourceModal.edit(record)
    },
    add() {
      this.$refs.datasourceModal.showModal()
    }
  }
}
</script>