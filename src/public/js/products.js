console.log("Products frontend javascript file");

$(function () {
    const STATUS_CLASS_MAP = {
        PROCESS: "status-process",
        PAUSE: "status-pause",
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
        $(".new-product-status").each(function () {
            const $select = $(this);
            const currentStatus = String($select.val() || "");
            $select.data("previousValue", currentStatus);
            setRowStatus($select.closest("tbody"), currentStatus);
        });
    }

function syncUploadPreviewState() {
    $(".upload-img-box").each(function () {
        const $box = $(this);
        const imageSrc = String($box.find("img").attr("src") || "");
        const hasPreview = imageSrc && imageSrc !== "/img/upload.svg";
        $box.toggleClass("has-preview", hasPreview);
    });
}

    function toggleProductFields() {
        const selectedValue = $(".product-collection").val();

        if (selectedValue === "CLOTH") {
            $("#product-size").show();
            $("#product-weight").hide();
            $("#product-volume").hide();
            $("#product-count").hide();

            $('[name="productSize"]').prop("disabled", false);
            $('[name="productWeight"]').prop("disabled", true);
            $('[name="productVolume"]').prop("disabled", true);
            $('[name="productCount"]').prop("disabled", true);
        } else if (selectedValue === "DRINK") {
            $("#product-volume").show();
            $("#product-weight").hide();
            $("#product-size").hide();
            $("#product-count").hide();

            $('[name="productVolume"]').prop("disabled", false);
            $('[name="productWeight"]').prop("disabled", true);
            $('[name="productSize"]').prop("disabled", true);
            $('[name="productCount"]').prop("disabled", true);
        } else if (selectedValue === "VITAMIN") {
            $("#product-count").show();
            $("#product-weight").hide();
            $("#product-volume").hide();
            $("#product-size").hide();

            $('[name="productCount"]').prop("disabled", false);
            $('[name="productWeight"]').prop("disabled", true);
            $('[name="productVolume"]').prop("disabled", true);
            $('[name="productSize"]').prop("disabled", true);

            $('[name="productCount"]').html(`
                <option value="30" selected>30 count</option>
                <option value="60">60 count</option>
                <option value="90">90 count</option>
                <option value="120">120 count</option>
                <option value="180">180 count</option>
                <option value="240">240 count</option>
            `);
        } else if (selectedValue === "CAPSULE") {
            $("#product-count").show();
            $("#product-weight").hide();
            $("#product-volume").hide();
            $("#product-size").hide();

            $('[name="productCount"]').prop("disabled", false);
            $('[name="productWeight"]').prop("disabled", true);
            $('[name="productVolume"]').prop("disabled", true);
            $('[name="productSize"]').prop("disabled", true);

            $('[name="productCount"]').html(`
                <option value="1">1 count</option>
                <option value="2">2 count</option>
                <option value="3">3 count</option>
                <option value="4">4 count</option>
                <option value="5" selected>5 count</option>
                <option value="6">6 count</option>
                <option value="7">7 count</option>
                <option value="8">8 count</option>
                <option value="9">9 count</option>
                <option value="10">10 count</option>
            `);
        } else {
            $("#product-weight").show();
            $("#product-volume").hide();
            $("#product-size").hide();
            $("#product-count").hide();

            $('[name="productWeight"]').prop("disabled", false);
            $('[name="productVolume"]').prop("disabled", true);
            $('[name="productSize"]').prop("disabled", true);
            $('[name="productCount"]').prop("disabled", true);
        }
    }

    $(".product-collection").on("change", toggleProductFields);
    toggleProductFields();
    syncInitialStatuses();
    syncUploadPreviewState();

    $(document).on("focus", ".new-product-status", function () {
        $(this).data("previousValue", String($(this).val() || ""));
    });

    $("#process-btn").on("click", () => {
        $(".dish-container").fadeToggle(300);
        $(".process-btn").css("display", "none");
    });

    $("#cancel-btn").on("click", (event) => {
        event.preventDefault();
        $(".dish-container").slideToggle(300);
        $(".process-btn").css("display", "flex");
    });

    $(document).on("change", ".new-product-status", async function (e) {
        const $select = $(e.currentTarget);
        const id = String($select.attr("id") || "");
        const previousValue = String($select.data("previousValue") || "");
        const productStatus = String($select.val() || "");
        const $row = $select.closest("tbody");

        if (!id || !productStatus || previousValue === productStatus) {
            return;
        }

        togglePending($select, true);

        try {
            const response = await axios.post(`/admin/product/${id}`, { productStatus });
            const result = response.data?.data;

            if (!result) {
                throw new Error("Product update failed");
            }

            $select.data("previousValue", productStatus);

            if (productStatus === "DELETE") {
                $row.addClass("is-removing");
                setTimeout(() => {
                    $row.fadeOut(220, function () {
                        $(this).remove();
                    });
                }, 80);
                showToast("Product deleted successfully");
                return;
            }

            setRowStatus($row, productStatus);
            showToast(`Product status updated to ${productStatus}`);
        } catch (err) {
            console.log(err);
            $select.val(previousValue);
            setRowStatus($row, previousValue);
            showToast("Product update failed", "error");
        } finally {
            togglePending($select, false);
            $select.blur();
        }
    });
});

function validateForm() {
    const productName = $(".product-name").val(),
        productPrice = $(".product-price").val(),
        productLeftCount = $(".product-left-count").val(),
        productCollection = $(".product-collection").val(),
        productDesc = $(".product-desc").val(),
        productStatus = $(".product-status").val();

    if (
        productName === "" ||
        productPrice === "" ||
        productLeftCount === "" ||
        productCollection === "" ||
        productDesc === "" ||
        productStatus === ""
    ) {
        alert("Please insert all required details!");
        return false;
    } else return true;
}

function previewFileHandler(input, order) {
    const imgClassName = input.className;
    console.log("input:", input);

    const file = $(`.${imgClassName}`).get(0).files[0];
    if (!file) return;

    const fileType = file["type"],
        validImageType = ["image/jpg", "image/jpeg", "image/png"];

    if (!validImageType.includes(fileType)) {
        $(input).val("");
        alert("Please insert only jpeg, jpg and png formats!");
        return;
    }

    const reader = new FileReader();
    reader.onload = function () {
        const $image = $(`#image-section-${order}`);
        const $box = $image.closest(".upload-img-box");

        $image.attr("src", reader.result);
        $box.addClass("has-preview");
    };
    reader.readAsDataURL(file);
}
