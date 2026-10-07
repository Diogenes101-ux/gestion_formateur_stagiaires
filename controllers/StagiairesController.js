$(document).ready(function () {
    let localData = []; 
    let selectedRow = null;

    function loadData() {
        $.get('/api/stagiaires', function (data) {
            localData = data;
            refreshTable();
        });
    }
    loadData();

    function refreshTable() {
        localData.sort((a, b) => a.numInscript - b.numInscript);
        $("#corpsTableau").empty();
        localData.forEach(s => {
            $("#corpsTableau").append(`
                <tr data-id="${s.numInscript}">
                    <td>${s.numInscript}</td>
                    <td>${s.nom}</td>
                    <td>${s.prenom}</td>
                    <td>${s.age}</td>
                    <td>${s.filiere}</td>
                    <td>${s.groupe}</td>
                </tr>
            `);
        });
    }

    $("#btnAjouter").click(function () {
        let ageVal = parseInt($("#age").val());
        let idVal = parseInt($("#numInscript").val());

        if (ageVal <= 0 || isNaN(ageVal)) {
            alert("خطأ: العمر يجب أن يكون أكبر من صفر!");
            return;
        }

        if (isNaN(idVal)) {
            alert("خطأ: يرجى إدخال رقم تسجيل صحيح!");
            return;
        }

        let stagiaire = {
            nom: $("#nom").val(),
            prenom: $("#prenom").val(),
            age: ageVal,
            numInscript: idVal,
            filiere: $("#filiere").val(),
            groupe: $("#groupe").val()
        };

        localData.push(stagiaire);
        refreshTable();
        $("input").val("");
    });

    $(document).on("click", "#corpsTableau tr", function () {
        $("#corpsTableau tr").attr("bgcolor", "");
        $(this).attr("bgcolor", "#d4edda");
        selectedRow = $(this);

        $("#numInscript").val(selectedRow.find("td:eq(0)").text());
        $("#nom").val(selectedRow.find("td:eq(1)").text());
        $("#prenom").val(selectedRow.find("td:eq(2)").text());
        $("#age").val(selectedRow.find("td:eq(3)").text());
        $("#filiere").val(selectedRow.find("td:eq(4)").text());
        $("#groupe").val(selectedRow.find("td:eq(5)").text());
    });

    $("#btnModifier").click(function () {
        if (!selectedRow) return alert("اختر متدرباً!");
        
        let oldId = selectedRow.data("id");
        let ageVal = parseInt($("#age").val());

        if (ageVal <= 0 || isNaN(ageVal)) {
            alert("العمر غير منطقي!");
            return;
        }

        let index = localData.findIndex(s => s.numInscript == oldId);
        if (index !== -1) {
            localData[index] = {
                nom: $("#nom").val(),
                prenom: $("#prenom").val(),
                age: ageVal,
                numInscript: parseInt($("#numInscript").val()),
                filiere: $("#filiere").val(),
                groupe: $("#groupe").val()
            };
            refreshTable();
            selectedRow = null;
            $("input").val("");
        }
    });

    $("#btnSupprimer").click(function () {
        if (!selectedRow) return alert("اختر متدرباً!");
        let id = selectedRow.find("td:eq(0)").text();
        if (confirm("حذف؟")) {
            localData = localData.filter(s => s.numInscript != id);
            refreshTable();
            selectedRow = null;
            $("input").val("");
        }
    });

    $("#btnSaveJson").click(function () {
        $.ajax({
            url: '/api/stagiaires/save-all',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(localData),
            success: function (res) {
                alert(res);
            }
        });
    });
});