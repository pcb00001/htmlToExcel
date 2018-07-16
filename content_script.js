$(document).ready(function () {
	var uri = 'data:application/vnd.ms-excel;base64,',
	template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
	base64 = function(s) {
		return window.btoa(unescape(encodeURIComponent(s)))
	}, 
	format = function(s, c) {
		return s.replace(/{(\w+)}/g, function(m, p) {
			return c[p];
		})
	}
	var tableToExcel =  function(html) {
		var container = $('<div><div>');
		var table = $('<table rules="groups" frame="hsides" border="1">'
						   + '<colgroup align="center"></colgroup>'
						   + '<colgroup align="left"></colgroup>'
						   + '<colgroup span="2" align="center"></colgroup>'
						   + '<colgroup span="3" align="center"></colgroup>'
					   +'</table>'
				   )
				   table.append(html.trim().replace(/\n/g, ''));
		container.html(table);
		console.log(container.html());
		var ctx = {
			worksheet : 'Sheet1',
			table : container.html()
		}
		window.location.href = uri + base64(format(template, ctx))
	}
	var btExport = $('<button>Export to Excel</button>')
	btExport.click(function() {
		var html = $('#resultTable').html();
		tableToExcel(html);
	});
	$('.head h1').append(btExport);
});

