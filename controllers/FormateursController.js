$(document).ready(function () {
    let localFormateurs = [];
    let selectedRow = null;

    function loadFormateurs() {
        $.get('/api/formateurs', function (data) {
            localFormateurs = data;
            refreshTable();
        });
    }
    loadFormateurs();

    function refreshTable() {
        localFormateurs.sort((a, b) => a.matricule - b.matricule);
        $("#corpsTableauFormateur").empty();
        localFormateurs.forEach(f => {
            $("#corpsTableauFormateur").append(`
                <tr data-id="${f.matricule}">
                    <td>${f.matricule}</td>
                    <td>${f.nom}</td>
                    <td>${f.prenom}</td>
                    <td>${f.age}</td>
                    <td>${f.specialite}</td>
                    <td>${f.email}</td>
                </tr>
            `);
        });
    }

    $("#btnAjouter").click(function () {
        let ageVal = parseInt($("#age").val());
        let matVal = parseInt($("#matricule").val());

        if (ageVal <= 0 || isNaN(ageVal)) {
            alert("! خطأ: العمر خاطئ");
            return;
        }

        let nFormateur = {
            nom: $("#nom").val(),
            prenom: $("#prenom").val(),
            age: ageVal,
            matricule: matVal,
            specialite: $("#specialite").val(),
            email: $("#email").val()
        };

        localFormateurs.push(nFormateur);
        refreshTable();
        $("input").val("");
    });

    $(document).on("click", "#corpsTableauFormateur tr", function () {
        $("#corpsTableauFormateur tr").attr("bgcolor", "");
        $(this).attr("bgcolor", "#d4edda");
        selectedRow = $(this);

        $("#matricule").val(selectedRow.find("td:eq(0)").text());
        $("#nom").val(selectedRow.find("td:eq(1)").text());
        $("#prenom").val(selectedRow.find("td:eq(2)").text());
        $("#age").val(selectedRow.find("td:eq(3)").text());
        $("#specialite").val(selectedRow.find("td:eq(4)").text());
        $("#email").val(selectedRow.find("td:eq(5)").text());
    });

    $("#btnModifier").click(function () {
        if (!selectedRow) return alert("اختر مدرباً!");
        
        let oldId = selectedRow.data("id");
        let ageVal = parseInt($("#age").val());

        if (ageVal <= 0 || isNaN(ageVal)) return alert("العمر خاطئ!");

        let index = localFormateurs.findIndex(f => f.matricule == oldId);
        if (index !== -1) {
            localFormateurs[index] = {
                nom: $("#nom").val(),
                prenom: $("#prenom").val(),
                age: ageVal,
                matricule: parseInt($("#matricule").val()),
                specialite: $("#specialite").val(),
                email: $("#email").val()
            };
            refreshTable();
            selectedRow = null;
            $("input").val("");
        }
    });

    $("#btnSupprimer").click(function () {
        if (!selectedRow) return alert("اختر مدرباً!");
        let id = selectedRow.find("td:eq(0)").text();
        if (confirm("تأكيد الحذف؟")) {
            localFormateurs = localFormateurs.filter(f => f.matricule != id);
            refreshTable();
            selectedRow = null;
            $("input").val("");
        }
    });

    $("#btnSaveJson").click(function () {
        $.ajax({
            url: '/api/formateurs/save-all',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(localFormateurs),
            success: function (res) {
                alert(res);
            }
        });
    });
});