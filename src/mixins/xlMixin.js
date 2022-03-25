import TokenCache from '@/utils/cache/TokenCache'
// import { saveAs } from 'file-saver'

/**
 * 过滤对象中为空的属性
 * @param obj
 * @returns {*}
 */
export function filterObj(obj) {
  if (!(typeof obj == 'object')) {
    return
  }

  for (let key in obj) {
    if (obj.hasOwnProperty(key) && (obj[key] == null || obj[key] == undefined || obj[key] === '')) {
      delete obj[key]
    }
  }
  return obj
}

export const xlMixin = {
  data() {
    return {
      //token header
      tokenHeader: { Authorization: 'Bearer ' + TokenCache.getToken() },
      /* 查询条件-请不要在queryParam中声明非字符串值的属性 */
      queryParam: {},
      /* 数据源 */
      dataSource: [],
      /* 分页参数 */
      ipagination: {
        current: 1,
        pageSize: 10,
        pageSizeOptions: ['10', '20', '30'],
        showTotal: (total, range) => {
          return range[0] + '-' + range[1] + ' 共' + total + '条'
        },
        showQuickJumper: true,
        showSizeChanger: true,
        total: 0
      },
      /* 排序参数 */
      isorter: {
        SortField: 'Id',
        SortType: 'desc'
      },
      /* 筛选参数 */
      filters: {},
      /* table加载状态 */
      loading: false,
      /* table选中keys*/
      selectedRowKeys: [],
      /* table选中records*/
      selectionRows: [],
      /* 查询折叠 */
      toggleSearchStatus: false,
      /* 高级查询条件生效状态 */
      superQueryFlag: false,
      /* 高级查询条件 */
      superQueryParams: ''
    }
  },
  mounted() {
    if (!this.disableMixinCreated) {
      // console.log(' -- mixin created -- ')
      this.loadData()
    }
  },
  methods: {
    loadData(arg) {
      if (!this.url.list) {
        this.$message.error('请设置url.list属性!')
        return
      }
      //加载数据 若传入参数1则加载第一页的内容
      if (arg === 1) {
        this.ipagination.current = 1
      }
      var params = this.getQueryParams() //查询条件
      this.loading = true
      this.$http
        .post(this.url.list, params)
        .then(res => {
          if (res.Success) {
            this.dataSource = res.Data
            this.ipagination.total = res.Total
          } else {
            this.$message.warning(res.Msg)
          }
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    getQueryParams() {
      //获取查询条件
      let sqp = {}
      var param = Object.assign(sqp, this.isorter, this.filters)
      // param.field = this.getQueryField()
      param.PageIndex = this.ipagination.current
      param.PageRows = this.ipagination.pageSize
      param.Search = this.queryParam
      // return filterObj(param)
      return param
    },
    onSelectChange(selectedRowKeys, selectionRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectionRows = selectionRows
    },
    onClearSelected() {
      this.selectedRowKeys = []
      this.selectionRows = []
    },
    searchQuery() {
      this.loadData(1)
    },
    superQuery() {
      this.$refs.superQueryModal.show()
    },
    searchReset() {
      this.onClearSelected()
      this.queryParam = {}
      this.loadData(1)
    },
    batchDel: function() {
      if (!this.url.deleteBatch) {
        this.$message.error('请设置url.deleteBatch属性!')
        return
      }
      if (this.selectedRowKeys.length <= 0) {
        this.$message.warning('请选择一条记录！')
        return
      } else {
        var ids = ''
        for (var a = 0; a < this.selectedRowKeys.length; a++) {
          ids += this.selectedRowKeys[a] + ','
        }
        var that = this
        this.$confirm({
          title: '确认删除',
          content: '是否删除选中数据?',
          onOk: function() {
            this.$http
              .post(that.url.deleteBatch, { ids: ids })
              .then(res => {
                if (res.success) {
                  that.$message.success(res.message)
                  that.loadData()
                  that.onClearSelected()
                } else {
                  that.$message.warning(res.message)
                }
              })
              .finally(() => {
                that.loading = false
              })
          }
        })
      }
    },
    handleDelete: function(id) {
      if (!this.url.delete) {
        this.$message.error('请设置url.delete属性!')
        return
      }
      var that = this
      this.$http.post(that.url.delete, [id]).then(res => {
        if (res.Success) {
          that.$message.success(res.Msg)
          that.loadData()
        } else {
          that.$message.warning(res.Msg)
        }
      })
    },
    handleTableChange(pagination, filters, sorter) {
      //分页、排序、筛选变化时触发
      //TODO 筛选
      if (Object.keys(sorter).length > 0) {
        this.isorter.column = sorter.field
        if (this.isorter.order.concat('end') !== sorter.order) {
          pagination.current = 1 //排序完毕 手动调整为第一页
        }
        this.isorter.order = 'ascend' == sorter.order ? 'asc' : 'desc'
      }
      // 换页清空已选择
      this.selectedRowKeys = []
      this.selectionRows = []
      this.ipagination = pagination
      this.loadData()
    },
    modalFormOk() {
      // 新增/修改 成功时，重载列表
      this.loadData()
    },
    /* 导出 */
    handleExportXls2(url) {
      // let paramsStr = encodeURI(JSON.stringify(this.getQueryParams()))
      // let url = `${window._CONFIG['domianURL']}/${this.url.exportXlsUrl}?paramsStr=${paramsStr}`
      window.location.href = url
    },
    handleExportWord(id) {
      let url = ''
      if (id === '' || id === undefined || id === null) {
        let ids = this.selectedRowKeys.join(',')
        url = `${window._CONFIG['domianURL']}/${this.url.exportXlsUrls}?ids=${ids}`
      } else {
        url = `${window._CONFIG['domianURL']}/${this.url.exportXlsUrl}?id=${id}`
      }

      window.location.href = url
    },
    handleExportXls(fileName, flag) {
      if (!fileName || typeof fileName != 'string') {
        fileName = '导出文件'
      }
      let param = { ...this.queryParam }
      if (this.selectedRowKeys && this.selectedRowKeys.length > 0) {
        param['selections'] = this.selectedRowKeys.join(',')
      }
      if (flag !== undefined) {
        param['flag'] = flag
      }
      this.$http({ url: this.url.exportXlsUrl, data: param, method: 'POST', responseType: 'blob' }).then(data => {
        if (!data) {
          this.$message.warning('文件下载失败')
          return
        }
        if (typeof window.navigator.msSaveBlob !== 'undefined') {
          window.navigator.msSaveBlob(
            new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }),
            fileName + '.xlsx'
          )
        } else {
          // let blob = new Blob([data], {
          //   type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          // })
          // saveAs(blob, fileName + '.xlsx')
          // return
          let url = window.URL.createObjectURL(
            new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
          )
          console.log('url', url)
          let link = document.createElement('a')
          link.style.display = 'none'
          link.href = url
          link.setAttribute('download', fileName + '.xlsx')
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link) //下载完成移除元素
          window.URL.revokeObjectURL(url) //释放掉blob对象
        }
      })
    },
    /* 导入 */
    handleImportExcel(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (info.file.status === 'done') {
        if (info.file.response.success) {
          this.$message.success(`${info.file.name} 文件上传成功`)
          this.loadData()
        } else if (info.file.response.code === '0') {
          this.$message.success(`${info.file.name} 文件上传成功`)
          this.loadData()
        } else {
          if (info.file.response.msg != null || info.file.response.msg != undefined) {
            this.$message.error(`${info.file.name} ${info.file.response.msg}.`)
          } else {
            this.$message.error(`${info.file.name} ${info.file.response.message}.`)
          }
        }
      } else if (info.file.status === 'error') {
        this.$message.error(`文件上传失败: ${info.file.msg} `)
      }
    },
    // 自定义导入
    handleImport1(option, url) {
      let formData = new FormData()
      // 向 formData 对象中添加文件
      formData.append('formFile', option.file)
      this.loading = true
      this.$http
        .post(url, formData)
        .then(res => {
          if (res.Success) {
            this.$message.success(res.Msg)
            this.loadData()
          } else {
            this.$message.warning(res.Msg)
          }

          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    }
  }
}
