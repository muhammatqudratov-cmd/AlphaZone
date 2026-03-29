console.log("Users frontend javascript file");

$(function () {
    const STATUS_CLASS_MAP = {
        ACTIVE: "status-active",
        BLOCK: "status-block",
        DELETE: "status-delete",
    };

    function showToast(message, type = "success") {
        const toast = $("<div />", {
            class: `admin-toast ${type}`,
            text: message,
        });

        $("body").append(toast);
        requestAnimationFrame(() => toast.addClass("show"));

        setTimeout(() => {
            toast.removeClass("show");
            setTimeout(() => toast.remove(), 300);
        }, 2400);
    }

    function setRowStatus($row, status) {
        $row.removeClass(Object.values(STATUS_CLASS_MAP).join(" "));
        if (STATUS_CLASS_MAP[status]) {
            $row.addClass(STATUS_CLASS_MAP[status]);
        }
        $row.attr("data-status", status);
    }

    function togglePending($select, isPending) {
        const $row = $select.closest("tbody");
        $select.prop("disabled", isPending);
        $row.toggleClass("is-pending", isPending);
    }

    function syncInitialStatuses() {
        $(".member-status").each(function () {
            const $select = $(this);
            const currentStatus = String($select.val() || "");
            $select.data("previousValue", currentStatus);
            setRowStatus($select.closest("tbody"), currentStatus);
        });
    }

    syncInitialStatuses();

    $(document).on("focus", ".member-status", function () {
        $(this).data("previousValue", String($(this).val() || ""));
    });

    $(document).on("change", ".member-status", async function (e) {
        const $select = $(e.currentTarget);
        const id = String($select.attr("id") || "");
        const previousValue = String($select.data("previousValue") || "");
        const memberStatus = String($select.val() || "");
        const $row = $select.closest("tbody");

        if (!id || !memberStatus || previousValue === memberStatus) {
            return;
        }

        togglePending($select, true);

        try {
            const response = await axios.post("/admin/user/edit", {
                _id: id,
                memberStatus,
            });

            const result = response.data?.data;
            if (!result) {
                throw new Error("User update failed");
            }

            $select.data("previousValue", memberStatus);

            if (memberStatus === "DELETE") {
                $row.addClass("is-removing");
                setTimeout(() => {
                    $row.fadeOut(220, function () {
                        $(this).remove();
                    });
                }, 80);
                showToast("User deleted successfully");
                return;
            }

            setRowStatus($row, memberStatus);
            showToast(`User status updated to ${memberStatus}`);
        } catch (err) {
            console.log(err);
            $select.val(previousValue);
            setRowStatus($row, previousValue);
            showToast("User update failed", "error");
        } finally {
            togglePending($select, false);
            $select.blur();
        }
    });
});
