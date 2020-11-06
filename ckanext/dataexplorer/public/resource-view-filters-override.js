this.ckan.module('resource-view-filters-override', function (jQuery) {
    'use strict';
  
    function initialize() {
      var self = this,
          resourceId = self.options.resourceId,
          fields = self.options.fields,
          dropdownTemplate = self.options.dropdownTemplate,
          addFilterTemplate = '<a class="btn btn-primary btn-add-filter" href="#">' + self._('Add Filter') + '</a>',
          filtersDiv = $('<div class="resource-view-filters-container"></div>');
  
      var filters = ckan.views.filters.get();
      _appendDropdowns(filtersDiv, resourceId, dropdownTemplate, fields, filters);
      var addFilterButton = _buildAddFilterButton(self, filtersDiv, addFilterTemplate,
                                                  fields, filters, function (evt) {
        // Build filters object with this element's val as key and a placeholder
        // value so _appendDropdowns() will create its dropdown
        var filters = {};
        filters[evt.val] = [];

        $(this).select2('destroy');
        $(this).parent().remove();
        _appendDropdowns(filtersDiv, resourceId, dropdownTemplate, fields, filters);
        evt.preventDefault();
      });
      self.el.append(addFilterButton);
      self.el.append(filtersDiv);
    }
  
    function _buildAddFilterButton(self, el, template, fields, filters, onChangeCallback) {
      var addFilterButton = $(template),
          currentFilters = Object.keys(filters),
          fieldsNotFiltered = $.grep(fields, function (field) {
            return !filters.hasOwnProperty(field);
          }),
          data = $.map(fieldsNotFiltered, function (d) {
            return { id: d, text: d };
          });
  
      if (data.length === 0) {
        return '';
      }
  
      addFilterButton.click(function (evt) {
        // FIXME: Move this class name to some external variable to keep it DRY
  
        // check if we already have filters without fields
        let current_fields = $('.resource-view-filter-field');
        let ok_to_add = true;

        if (current_fields.length > 0){
          ok_to_add = false;
          for ( var i = 0, l = current_fields.length; i < l; i++ ) {
            let elem = $(current_fields[i]);
            elem.hide(400).show(200);
          }
        }

        // if .resource-view-filter-values exists, check if it has at least one value
        let current_filters = $('.resource-view-filter');
        for ( var i = 0, l = current_filters.length; i < l; i++ ) {

          let hasValue = false;
          let elems = $(current_filters[i]).find('.resource-view-filter-values');
          $.each(elems, function (i, elem) {
            let input = $(elem).children('input');
            if ($(input).attr('value')){
              hasValue = true;
            }
          });
          
          if (hasValue == false) {
            ok_to_add = false;
            let elem = $(current_filters[i]);
            elem.hide(400).show(200);
          }
          
        }
      
        if (ok_to_add) {
          var addFilterDiv = $('<div class="resource-view-filter-field"><input type="hidden"></input></div>'),
              addFilterInput = addFilterDiv.find('input');
          el.append(addFilterDiv);
  
          // TODO: Remove element from "data" when some select selects it.
          addFilterInput.select2({
            data: data,
            placeholder: self._('Select a field'),
          }).on('change', onChangeCallback);
        }
        evt.preventDefault();
      });
  
      return addFilterButton;
    }
  
    function _appendDropdowns(dropdowns, resourceId, template, fields, filters) {
      
      $.each(fields, function (i, field) {
        if (filters.hasOwnProperty(field)) {
          dropdowns.append(_buildDropdown(self.el, template, field));
        }
      });

      return dropdowns;
  
      function _buildDropdown(el, template, filterName) {
        var theseFilters = filters[filterName] || [];
        template = $(template.replace(/{filter}/g, filterName));

        // FIXME: Get the CSS class from some external variable
        var dropdowns = template.find('.resource-view-filter-values');
  
        // Can't use push because we need to create a new array, as we're
        // modifying it.
        theseFilters = theseFilters.concat([undefined]);
        theseFilters.forEach(function (value, i) {
          var dropdown = $('<input type="hidden" name="'+filterName+'"></input>');
          if (value !== undefined) {
            dropdown.val(value);
          }
          dropdowns.append(dropdown);
        });
  
        var queryLimit = 20;
        dropdowns.find('input').select2({
          allowClear: true,
          placeholder: 'Select a value', // select2 needs a placeholder to allow clearing
          width: '300px',
          minimumInputLength: 0,
          ajax: {
            url: ckan.url('/api/3/action/datastore_search'),
            datatype: 'json',
            quietMillis: 200,
            cache: true,
            data: function (term, page) {
              var offset = (page - 1) * queryLimit,
                  query;
  
              query = {
                resource_id: resourceId,
                limit: queryLimit,
                offset: offset,
                fields: filterName,
                distinct: true,
                sort: filterName,
                include_total: false
              };
  
              if (term !== '') {
                var q = {};
                if (term.indexOf(' ') == -1) {
                  term = term + ':*';
                  query.plain = false;
                }
                q[filterName] = term;
                query.q = JSON.stringify(q);
              }
  
              return query;
            },
            results: function (data, page) {
              var records = data.result.records,
                  hasMore = (records.length == queryLimit),
                  results;
  
              results = $.map(records, function (record) {
                return { id: record[filterName], text: String(record[filterName]) };
              });
  
              return { results: results, more: hasMore };
            }
          },
          initSelection: function (element, callback) {
            var data = {id: element.val(), text: element.val()};
            callback(data);
          },
        }).on('change', _onChange);

        var close_bt = $(template).find('.close');
        close_bt.click(function (){
          ckan.views.filters.unset(filterName);
          $(template).parent().find('input[value='+filterName+']').parent().remove();
          $(template).remove();
        });
  
        return template;
      }
    }
  
    function _onChange(evt) {

      var filterName = evt.currentTarget.name,
          filterValue = evt.val,
          currentFilters = ckan.views.filters.get(filterName) || [],
          addToIndex = currentFilters.length;
  
      // Make sure we're not editing the original array, but a copy.
      currentFilters = currentFilters.slice();

      if (evt.removed) {
        addToIndex = currentFilters.indexOf(evt.removed.id);
        if (addToIndex !== -1) {
          currentFilters.splice(addToIndex, 1);
        }
      }
      if (evt.added) {
        currentFilters.splice(addToIndex, 0, filterValue);
      }
  
      if (currentFilters.length > 0) {
        ckan.views.filters.set(filterName, currentFilters);
      } else {
        ckan.views.filters.unset(filterName);
      }

    }
  
    return {
      initialize: initialize,
      options: {
        dropdownTemplate: [
          '<div class="resource-view-filter">',
          '  <div class="resource-view-filter-header">',
          '    {filter}',
          '    <button type="button" class="close" aria-label="Close Filter">',
          '      <span aria-hidden="true">&times;</span>',
          '    </button>',
          '  </div>',
          '  <div class="resource-view-filter-values"></div>',
          '</div>',
        ].join('\n')
      }
    };
  });
  