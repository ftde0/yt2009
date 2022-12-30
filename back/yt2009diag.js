let diag_data = ``

module.exports = {
    "write": function(data) {
        diag_data = data + "\n" + diag_data
    },
    
    "read": function(req, res) {
        return diag_data;
    }
}